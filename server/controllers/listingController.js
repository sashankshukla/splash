const Listing = require('../models/listingModel');
const User = require('../models/userModel');
const Pool = require('../models/poolModel');
const data = require('./initalData.js');
const mongoose = require('mongoose');

const getListings = async (req, res) => {
  const listings = await Listing.find({status: 'Available'});
  res.status(200).json(listings);
};

const getFilteredListings = async (req, res) => {
  console.log(req.params.query);
  let max = 1000000000;
  let queryDecoded = "";
  let filterObj = {};
  let sortObj = {};

  if(req.params.query) {
    queryDecoded = JSON.parse(decodeURIComponent(req.params.query));
    console.log(queryDecoded);
  } else {
    const listings = await Listing.find(filterObj);
    res.status(200).json(listings);
  }

  // !! FIND OBJ !!
  let filterArr = [];
  // keyword
  if(queryDecoded.keywordSearch !== "") {
    filterArr.push({"$text": {"$search": queryDecoded.keywordSearch}});
    //filterObj.$text = {$search: queryDecoded.keywordSearch};
  }

  // price
  if(queryDecoded.price.lower > 0 && queryDecoded.price.upper < max) {
    filterArr.push({"price": {"$and": [{"$gte": Number(queryDecoded.price.lower)}, {"$lte": Number(queryDecoded.price.upper)}]}});
    //filterObj.price = {$and: [{$gte: queryDecoded.price.lower}, {$lte: queryDecoded.price.upper}]};
  } else if(queryDecoded.price.lower > 0) {
    filterArr.push({"price": {"$gte": Number(queryDecoded.price.lower)}});
    //filterObj.price = {$gte: queryDecoded.price.lower};
  } else if(queryDecoded.price.upper < max) {
    filterArr.push({"price": {"$lte": Number(queryDecoded.price.upper)}});
    //filterObj.price = {$lte: queryDecoded.price.upper};
  }

  //status
  let statArr = [];
  if(queryDecoded.status.available) {
    statArr.push('Available');
  }
  if(queryDecoded.status.sold) {
    statArr.push('Sold');
  }

  if(statArr.length > 0) {
    if(statArr.length > 1) {
      //both
      filterArr.push({"status": {"$in": statArr}});
      //filterObj.status = {$in: statArr};
    } else {
      //just one
      filterArr.push({"status": statArr[0]});
      //filterObj.status = statArr[0];
    }
  }

  //investmentType
  let investArr = [];
  if(queryDecoded.investmentType.residence) {
    investArr.push('House/Living Accommodation');
  }
  if(queryDecoded.investmentType.franchise) {
    investArr.push('Franchise');
  }
  if(queryDecoded.investmentType.gasStation) {
    investArr.push('Gas Station');
  }
  if(queryDecoded.investmentType.stockPortfolio) {
    investArr.push('Stock Portfolio');
  }

  if(investArr.length > 0) {
    if(investArr.length > 1) {
      //more than one
      filterArr.push({"investmentType": {"$in": investArr}});
      //filterObj.investmentType = {$in: investArr};
    } else {
      //only one
      filterArr.push({"investmentType": investArr[0]});
      //filterObj.investmentType = investArr[0];
    }
  }

  // big catch-all that replaces whole query with null if we have query choices that should cause it
  if((statArr.length > 0 && investArr.length > 0) || filterArr.length == 0) { //remains null
    if(filterArr.length > 1) { //more than one field filtered on
      filterObj = filterArr.reduce((acc, curr, i) => ({ ...acc, [`${Object.keys(curr)[0]}`]: Object.values(curr)[0]}), {});
      // Ref: https://www.appsloveworld.com/nodejs/100/321/how-do-i-add-multiple-optional-parameters-in-express-in-same-route
    } else { //only one field filtered on
      filterObj = filterArr[0];
    }
  } else {
    filterObj = {_id: null}; // should always return an empty array if we've not chosen any of the checkbox fields;
  }
  console.log(filterObj);

  // !! TODO: SORT OBJ !!
  let sortArr = [];
  
  const listings = await Listing.find(filterObj);
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
