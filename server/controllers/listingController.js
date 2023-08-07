const Listing = require('../models/listingModel');
const User = require('../models/userModel');
const Pool = require('../models/poolModel');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');

// Configure Nodemailer with your custom domain email provider's settings
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'splashfinance455@gmail.com', // Your Gmail email address
    pass: process.env.GMAIL_API, // Your Gmail password or App Password
  },
});

const getListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({ status: 'Available' });
  if (!listings) {
    res.status(400);
  }

  res.status(200).json(listings);
});

const getFilteredListings = asyncHandler(async (req, res) => {
  // TODO: fix search
  // TODO: add { score: {$meta: "textScore"} } to find after keyword search, then add again in sort

  // await Listing.createIndexes({ price: 1 });
  // await Listing.createIndexes({ createdAt: 1 });
  // await Listing.createIndexes({ name: "text" });

  let queryDecoded = '';

  let score = { score: { $meta: 'textScore' } };

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

  // FILTER/FIND

  // keyword search
  if (queryDecoded.keywordSearch) {
    //filterArr.push({ $text: { $search: queryDecoded.keywordSearch } });
    filterArr.push({
      name: {
        $regex: new RegExp(queryDecoded.keywordSearch),
        $options: "i"
      }
    });
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

  // SORT

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
  }));
  console.log(filterObj);

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
  }

  res.status(200).json(listing);
});

//DO SOMETHING FOR POOL CONTRIBUTORS?
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

//ADD IN DELETING ALL OF THE POOLS AND EMAILING AS WELL
const deleteListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    res.status(400);
    throw new Error('Listing not found');
  }
  // ^^This scenario isn't actually an issue because it's still the desired outcome, right?
  if (listing.status === 'Sold') {
    res.status(400);
    throw new Error('Cannot delete a sold listing');
  }

  const deniedPools = await Pool.find({listingId: req.params.listingId});
  const rejectedEmailList = [];
  deniedPools.forEach((deniedPool) => {
    deniedPool.users.forEach((user) => {
      console.log(user.email);
      rejectedEmailList.push(user.email);
      console.log(rejectedEmailList.length);
    });
  });
  console.log("rejectedemaillist");
console.log(rejectedEmailList);
  // notifies all members of the listing pools that the seller has deleted the listing
  // Email content with template literals and newline characters
  const deniedEmailContent = `The listing ${listing.name} has been deleted by the seller.
  Your contribution has been cancelled, and no funds will be removed from your account.
  
  Best of luck in your future investment endeavours!`;
  const deniedMailOptions = {
    from: 'splash@frankeyhe.dev',
    to: rejectedEmailList,
    subject: `Splash Finance: The listing at ${listing.name} was deleted by the seller.`,
    text: deniedEmailContent,
  };

 if(rejectedEmailList.length>0) { transporter.sendMail(deniedMailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(404).json(error);
    } else {
      console.log('Email sent:', info.response);
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
    throw new Error('Pool does not own this listing');
  }
  const members = pool.users;
  const emailList = [];
  members.forEach(async (member) => {
    emailList.push(member.email);
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

  const deniedPools = await Pool.find({listingId: req.params.listingId});
  const rejectedEmailList = [];
  deniedPools.forEach((deniedPool) => {
    deniedPool.users.forEach((user) => {
      console.log(user.email);
      rejectedEmailList.push(user.email);
      console.log(rejectedEmailList.length);
    });
  });

  listing.status = 'Sold';
  await listing.save();

  const user = req.user;
  user.funds += listing.price;
  await user.save();

  await Pool.deleteMany({ listingId: req.params.listingId });
  // notifies all members of the pool that the seller as accepted their pool offer
  // Email content with template literals and newline characters
  const emailContent = `The following Pool has been sold to you!

  You are now the proud owners of ${listing.name} !
  Breakdown of Equity: Listing Price $ ${listing.price.toLocaleString()}

  ${printOwnership(members)}`;
  const mailOptions = {
    from: 'splash@frankeyhe.dev',
    to: emailList, // Join the recipients' email addresses with a comma and space
    subject: `Splash Finance: Your pool ${req.params.poolId} for the listing at ${listing.name} was successfully bought!`,
    text: emailContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(404).json(error);
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({});
    }
  });

  // notifies all members of the other pools that the seller has sold the lising to another pool
  // Email content with template literals and newline characters
  const deniedEmailContent = `The listing ${listing.name} has been sold to someone else.
  Your contribution has been cancelled, and no funds will be removed from your account.
  
  Best of luck in your future investment endeavours!`;
  const deniedMailOptions = {
    from: 'splash@frankeyhe.dev',
    to: rejectedEmailList,
    subject: `Splash Finance: The listing at ${listing.name} was sold to another pool.`,
    text: deniedEmailContent,
  };

  transporter.sendMail(deniedMailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(404).json(error);
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({});
    }
  });

  res.status(200).json(listing);
});

function printOwnership(members) {
  const ownershipStrings = members.map((member) => {
    return `Owner: ${member.email}\nEquity: ${member.equity.toLocaleString()}\n**************`;
  });

  return ownershipStrings.join('\n');
}

module.exports = {
  getListings,
  getFilteredListings,
  getListingsForUser,
  addListing,
  updateListing,
  deleteListing,
  sellListing,
};
