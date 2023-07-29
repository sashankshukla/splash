const Pool = require('../models/poolModel');
const Listing = require('../models/listingModel');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')

const getPools = asyncHandler(async (req, res) => {
  // TODO: add filter as well
  const pools = await Pool.find({ private: false });
  res.status(200).json(pools);
});

const getPrivatePool = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log('Invalid ID');
    res.status(400).send('Invalid ID');
    return;
  }

  try {
    const pool = await Pool.findById(id);

    if (!pool) {
      console.log('Pool not found');
      res.status(400).send('Pool not found');
      return;
    }

    if (pool.private) {
      res.status(200).json(pool);
    } else {
      console.log('No such private pool found');
      res.status(400).send('No such private pool found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

const getPoolsForListing = asyncHandler(async (req, res) => {
  const pools = await Pool.find({ listingId: req.params.listingId });
  if (!pools) {
    res.status(400);
    throw new Error('Pools not found');
  }
  res.status(200).json(pools);
});

const getPoolsForUser = asyncHandler(async (req, res) => {
  const user = req.user;
  console.log("getpoolforuserserver");
  console.log(user);
  const pools = await Pool.find({ 'users.email': user.email });
  if (!pools) {
    res.status(400);
  }
  res.status(200).json(pools);
});

const getPoolsCreatedByUser = asyncHandler(async (req, res) => {
  const user = req.user;
  const pools = await Pool.find({ createdBy: user.email });
  if (!pools) {
    res.status(400);
    throw new Error('Pools not found');
  }
  res.status(200).json(pools);
});

const getTotalPoolEquity = asyncHandler(async (req, res) => {
  const pool = await Pool.findById(req.params.id);
  if (!pool) {
    res.status(400);
    throw new Error('Pool not found');
  }
  const totalEquity = pool.users.reduce((total, user) => total + user.equity, 0);
  res.status(200).json(totalEquity);
});

const getPoolsCompletedForUser = asyncHandler(async (req, res) => {
  const userListings = (await Listing.find({ createdBy: req.user.email, status: 'Available' })).map(
    (listing) => listing._id,
  );
  const pools = [];
  for (const listingId of userListings) {
    const poolsForListing = await Pool.find({ listingId: listingId });
    pools.push(...poolsForListing);
  }
  if (!pools) {
    res.status(400);
    throw new Error('Pools not found');
  }
  const completedPools = [];
  for (const pool of pools) {
    if (pool.remaining == 0) {
      completedPools.push(pool);
    }
  }
  res.status(200).json(completedPools);
});

const addPool = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.listingId || !req.body.contribution) {
    res.status(400);
    throw new Error('Please specify a name, private, and listingId');
  }
  const listing = await Listing.findById(req.body.listingId);
  if (req.body.contribution > listing.price || req.body.contribution <= 0) {
    res.status(400);
    throw new Error('Invalid contribution');
  }
  const pool = await Pool.create({
    ...req.body,
    createdBy: req.user.email,
    users: [{ email: req.user.email, equity: req.body.contribution }],
    totalValue: listing.price,
    remaining: listing.price - req.body.contribution,
  });
  res.status(200).json(pool);
});

const joinPool = asyncHandler(async (req, res) => {
  const pool = await Pool.findById(req.params.id);
  if (!pool) {
    res.status(400);
    throw new Error('Pool not found');
  }

  if (pool.remaining < req.body.equity) {
    res.status(400);
    throw new Error('Contribution is too high');
  }
  pool.remaining -= req.body.equity;
  pool.users = [...pool.users, { email: req.user.email, equity: req.body.equity }];

  await pool.save();
  res.status(200).json(pool);
});

const editPool = asyncHandler(async (req, res) => {
  const pool = await Pool.findById(req.params.id);
  if (!pool) {
    res.status(400);
    throw new Error('Pool not found');
  }

  poolUser = pool.users.find((user) => user.email === req.user.email);
  pool.remaining += poolUser.equity;
  if (pool.remaining < req.body.equity) {
    res.status(400);
    throw new Error('Contribution is too high');
  }
  poolUser.equity = req.body.equity;
  pool.remaining -= poolUser.equity;

  await pool.save();
  res.status(200).json(pool);
});

const leavePool = asyncHandler(async (req, res) => {
  const pool = await Pool.findById(req.params.id);
  if (!pool) {
    res.status(400);
    throw new Error('Pool not found');
  }

  poolUser = pool.users.find((user) => user.email === req.user.email);
  pool.remaining += poolUser.equity;

  pool.users.pull(poolUser);
  await pool.save();
  res.status(200).json(pool);
});

const deletePool = asyncHandler(async (req, res) => {
  const pool = await Pool.findById(req.params.id);
  if (!pool) {
    res.status(400);
    throw new Error('Pool not found');
  }
  if (pool.createdBy !== req.user.email) {
    res.status(400);
    throw new Error('User does not own this pool');
  }
  await Pool.deleteOne({ _id: req.params.id });
  res.status(200).json({ id: req.params.id });
});

const denyPool = asyncHandler(async (req, res) => {
  const user = req.user;
  const pool = await Pool.findById(req.params.id);
  if(!pool) {
    res.status(400);
    throw new Error('Pool not found');
  }

  const listing = await Listing.findById(pool.listingId);
  if(listing.createdBy !== user.email) {
    res.status(400);
    throw new Error('User does not own listing for pool');
  }

  for(let i = 0; i < pool.users.length; i++) {
    // TODO: send email to each user
    let currEmail = pool.users[i].email;
    if(!currEmail) {
      console.log("error retrieving user email");
    }
    console.log("sending email to " + currEmail);
  }
  
  await Pool.deleteOne({ _id: req.params.id });
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getPools,
  getPrivatePool,
  getPoolsForListing,
  getTotalPoolEquity,
  getPoolsForUser,
  getPoolsCreatedByUser,
  getPoolsCompletedForUser,
  addPool,
  joinPool,
  editPool,
  leavePool,
  deletePool,
  denyPool,
};
