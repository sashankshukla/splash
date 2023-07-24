const Listing = require('../models/listingModel');
const User = require('../models/userModel');
const Pool = require('../models/poolModel');
const data = require('./initalData.js');
const mongoose = require('mongoose');

const getListings = async (req, res) => {
  const listings = await Listing.find({ status: 'Available' });
  res.status(200).json(listings);
};

const getFilteredListings = async (req, res) => {
  Listing.createIndexes({ price: 1 });
  Listing.createIndexes({ createdAt: 1 });

  let queryDecoded = '';
  let filterObj = {};
  let sortObj = {};

  if (req.params.query) {
    queryDecoded = JSON.parse(decodeURIComponent(req.params.query));
  } else {
    const listings = await Listing.find(filterObj);
    res.status(200).json(listings);
  }

  // keyword search
  let filterArr = [];
  if (queryDecoded.keywordSearch) {
    filterArr.push({ $text: { $search: queryDecoded.keywordSearch } });
  }

  // price
  const { lower, upper } = queryDecoded.price;
  console.log(lower, upper);
  filterArr.push({
    price: {
      $gte: parseInt(lower, 10),
      $lte: parseInt(upper, 10),
    },
  });

  //status
  const { available, sold } = queryDecoded.status;
  let statArr = [];
  if (available) {
    statArr.push('Available');
  }
  if (sold) {
    statArr.push('Sold');
  }
  filterArr.push({ status: { $in: statArr } });

  //investmentType
  let investArr = [];
  if (queryDecoded.investmentType.residence) {
    investArr.push('Housing/Living Accommodation');
  }
  if (queryDecoded.investmentType.franchise) {
    investArr.push('Franchise');
  }
  if (queryDecoded.investmentType.gasStation) {
    investArr.push('Gas Station');
  }
  if (queryDecoded.investmentType.stockPortfolio) {
    investArr.push('Stock Portfolio');
  }
  filterArr.push({ investmentType: { $in: investArr } });

  const sortArr = [];
  const { sortTime, sortPrice } = queryDecoded;
  if (sortPrice == 'High to Low') {
    sortArr.push({ price: -1 });
  } else if (sortPrice == 'Low to High') {
    sortArr.push({ price: 1 });
  }
  if (sortTime == 'Newest First') {
    sortArr.push({ createdAt: -1 });
  } else if (sortTime == 'Oldest First') {
    sortArr.push({ createdAt: 1 });
  }
  sortObj =
    sortArr.length > 0
      ? sortArr.reduce((acc, curr, i) => ({
          ...acc,
          [`${Object.keys(curr)[0]}`]: Object.values(curr)[0],
        }))
      : {};
  console.log(sortObj);

  filterObj = filterArr.reduce((acc, curr, i) => ({
    ...acc,
    [`${Object.keys(curr)[0]}`]: Object.values(curr)[0],
    //Ref: https://www.appsloveworld.com/nodejs/100/321/how-do-i-add-multiple-optional-parameters-in-express-in-same-route
  }));
  console.log(filterObj);

  const listings = await Listing.find(filterObj).sort(sortObj);
  res.status(200).json(listings);
};

const getListingsForUser = async (req, res) => {
  const listings = await Listing.find({ createdBy: req.user.email });
  res.status(200).json(listings);
};

const addListing = async (req, res) => {
  req.body.address = JSON.parse(req.body.address);
  req.body.details = JSON.parse(req.body.details);
  if (!req.body.name || !req.body.address || !req.body.price || !req.user.email) {
    res.status(400);
    throw new Error('Please specify a name, address, price, and email');
  }

  const images = req.files.map((file) => file.location); // Retrieve the file paths of all the uploaded images

  const listing = await Listing.create({
    ...req.body,
    images,
    createdBy: req.user.email,
  });
  res.status(200).json(listing);
};

const updateListing = async (req, res) => {
  req.body.address = JSON.parse(req.body.address);
  req.body.details = JSON.parse(req.body.details);

  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    res.status(400);
    throw new Error('listing not found');
  }

  const images = req.files.map((file) => file.location); // Retrieve the file paths of all the uploaded images

  const updatedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    { ...req.body, images },
    {
      new: true,
    },
  );
  res.status(200).json(updatedListing);
};

const deleteListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    res.status(400);
    throw new Error('Listing not found');
  }
  await Listing.deleteOne({ _id: req.params.id });
  res.status(200).json({ id: req.params.id });
};

const sellListing = async (req, res) => {
  const listing = await Listing.findById(req.params.listingId);
  if (!listing) {
    res.status(400);
    throw new Error('Listing not found');
  }
  const pool = await Pool.findById(req.params.poolId);
  if (!pool) {
    res.status(400);
    throw new Error('Pool not found');
  }
  if (pool.listingId.toString() !== listing.id) {
    res.status(400);
    throw new Error('Pool does not own this listing');
  }
  const members = pool.users;
  members.forEach(async (member) => {
    const user = await User.findOne({ email: member.email });
    if (user.funds < member.equity)
      throw new Error('User does not have enough funds to purchase this listing');
    user.ownerships = [
      ...user.ownerships,
      { listingId: new mongoose.Types.ObjectId(listing.id), amount: member.equity },
    ];
    user.funds -= member.equity;
    await user.save();
  });
  listing.status = 'Sold';
  await listing.save();
  const user = req.user;
  user.funds += listing.price;
  await user.save();
  await Pool.deleteOne({ _id: req.params.poolId });
  res.status(200).json(listing);
};

// TODO : Filtering listings

module.exports = {
  getListings,
  getFilteredListings,
  getListingsForUser,
  addListing,
  updateListing,
  deleteListing,
  sellListing,
};
