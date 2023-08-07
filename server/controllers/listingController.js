const Listing = require('../models/listingModel');
const User = require('../models/userModel');
const Pool = require('../models/poolModel');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'splashfinance455@gmail.com',
    pass: process.env.GMAIL_API,
  },
});

const createMailingOptions = (emailList, subject, content) => {
  return {
    from: 'splash@frankeyhe.dev',
    to: emailList,
    subject: subject,
    text: content,
  };
};

const createDenyEmailContent = (listing) => {
  return `The listing ${listing.name} has been deleted by the seller.
  Your contribution has been cancelled, and no funds will be removed from your account.
  
  Best of luck in your future investment endeavours!`;
};

const createAcceptEmailContent = (listing, members) => {
  return `The following Pool has been sold to you!

  You are now the proud owners of ${listing.name} !
  Breakdown of Equity: Listing Price $ ${listing.price.toLocaleString()}

  ${printOwnership(members)}`;
};

const printOwnership = (members) => {
  const ownershipStrings = members.map((member) => {
    return `Owner: ${member.email}\nEquity: ${member.equity.toLocaleString()}\n**************`;
  });
  return ownershipStrings.join('\n');
};

const getListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({ status: 'Available' });
  if (!listings) {
    res.status(400);
    throw new Error('No listings found');
  }
  res.status(200).json(listings);
});

const getFilteredListings = asyncHandler(async (req, res) => {
  let queryDecoded = '';

  const filterArr = [];
  const sortArr = [];

  let filterObj = {};
  let sortObj = {};

  if (req.params.query) {
    queryDecoded = JSON.parse(decodeURIComponent(req.params.query));
  } else {
    const listings = await Listing.find(filterObj);
    if (!listings) {
      res.status(400);
    }
    res.status(200).json(listings);
  }

  // keyword search
  if (queryDecoded.keywordSearch) {
    filterArr.push({
      name: {
        $regex: new RegExp(queryDecoded.keywordSearch),
        $options: 'i',
      },
    });
  }

  // price
  const { lower, upper } = queryDecoded.price;
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

  // sort
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

  filterObj = filterArr.reduce((acc, curr, i) => ({
    ...acc,
    [`${Object.keys(curr)[0]}`]: Object.values(curr)[0],
  }));

  const listings = await Listing.find(filterObj).sort(sortObj);
  if (!listings) {
    res.status(400);
  }
  res.status(200).json(listings);
});

const getListingsForUser = asyncHandler(async (req, res) => {
  const listings = await Listing.find({ createdBy: req.user.email });
  if (!listings) {
    res.status(400);
  }
  res.status(200).json(listings);
});

const addListing = asyncHandler(async (req, res) => {
  req.body.address = JSON.parse(req.body.address);
  req.body.details = JSON.parse(req.body.details);
  if (!req.body.name || !req.body.address || !req.body.price || !req.user.email) {
    res.status(400);
    throw new Error('Please specify a name, address, price, and email');
  }
  const images = req.files.map((file) => file.location);
  const listing = await Listing.create({
    ...req.body,
    images,
    createdBy: req.user.email,
  });
  if (!listing) {
    res.status(400);
    throw new Error('there was an error creating the listing');
  }
  res.status(200).json(listing);
});

const updateListing = asyncHandler(async (req, res) => {
  req.body.address = JSON.parse(req.body.address);
  req.body.details = JSON.parse(req.body.details);
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    res.status(400);
    throw new Error('listing not found');
  }
  const images = req.files.map((file) => file.location);
  const updatedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    { ...req.body, images },
    {
      new: true,
    },
  );
  res.status(200).json(updatedListing);
});

const deleteListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    res.status(400);
    throw new Error('Listing not found');
  }
  if (listing.status === 'Sold') {
    res.status(400);
    throw new Error('Cannot delete a sold listing');
  }
  const poolsForListing = await Pool.find({ listingId: req.params.listingId });
  const rejectedEmailList = [];
  poolsForListing.forEach((pool) => {
    pool.users.forEach((user) => {
      rejectedEmailList.push(user.email);
    });
  });

  const deniedEmailContent = createDenyEmailContent(listing);
  const deniedMailOptions = createMailingOptions(
    rejectedEmailList,
    `Splash Finance: The listing at ${listing.name} was deleted by the seller.`,
    deniedEmailContent,
  );

  if (rejectedEmailList.length > 0) {
    transporter.sendMail(deniedMailOptions, (error, info) => {
      if (error) {
        res.status(404).json(error);
      } else {
        res.status(200).json({});
      }
    });
  }
  await Listing.deleteOne({ _id: req.params.id });
  res.status(200).json({ id: req.params.id });
});

const sellListing = asyncHandler(async (req, res) => {
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
    throw new Error('Pool is not for this listing');
  }
  const members = pool.users;
  const emailList = [];
  members.forEach(async (member) => {
    emailList.push(member.email);
    const user = await User.findOne({ email: member.email });
    if (user.funds < member.equity)
      throw new Error('One of the users does not have enough funds to purchase this listing');
    user.ownerships = [
      ...user.ownerships,
      { listingId: new mongoose.Types.ObjectId(listing.id), amount: member.equity },
    ];
    user.funds -= member.equity;
    await user.save();
  });

  const deniedPools = await Pool.find({ listingId: req.params.listingId });
  const rejectedEmailList = [];
  deniedPools.forEach((deniedPool) => {
    deniedPool.users.forEach((user) => {
      rejectedEmailList.push(user.email);
    });
  });

  listing.status = 'Sold';
  await listing.save();

  const user = req.user;
  user.funds += listing.price;
  await user.save();

  await Pool.deleteMany({ listingId: req.params.listingId });
  const emailContent = createAcceptEmailContent(listing, members);
  const mailOptions = createMailingOptions(
    emailList,
    `Splash Finance: The listing at ${listing.name} was sold to your pool.`,
    emailContent,
  );

  if (emailList.length > 0) {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(404).json(error);
      } else {
        res.status(200).json({});
      }
    });
  }

  const deniedEmailContent = `The listing ${listing.name} has been sold to someone else.
  Your contribution has been cancelled, and no funds will be removed from your account.
  
  Best of luck in your future investment endeavours!`;
  const deniedMailOptions = createMailingOptions(
    rejectedEmailList,
    `Splash Finance: The listing at ${listing.name} was sold to someone else.`,
    deniedEmailContent,
  );

  if (rejectedEmailList.length > 0) {
    transporter.sendMail(deniedMailOptions, (error, info) => {
      if (error) {
        res.status(404).json(error);
      } else {
        res.status(200).json({});
      }
    });
  }

  res.status(200).json(listing);
});

module.exports = {
  getListings,
  getFilteredListings,
  getListingsForUser,
  addListing,
  updateListing,
  deleteListing,
  sellListing,
};
