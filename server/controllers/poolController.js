const Pool = require('../models/poolModel');
const Listing = require('../models/listingModel');
const mongoose = require('mongoose');

const getPools = async (req, res) => {
  // TODO: add filter as well
  const pools = await Pool.find({ private: false });
  res.status(200).json(pools);
};

const addPool = async (req, res) => {
  if (!req.body.name || !req.body.listingId || !req.body.contribution) {
    res.status(400);
    throw new Error('Please specify a name, private, and listingId');
  }
  const listing = await Listing.findById(req.body.listingId);
  const pool = await Pool.create({
    ...req.body,
    createdBy: req.user.email,
    users: [{ email: req.user.email, equity: req.body.contribution }],
    totalValue: listing.price,
    remaining: listing.price - req.body.contribution,
  });
  res.status(200).json(pool);
};

const deletePool = async (req, res) => {
  const pool = await Pool.findById(req.params.id);
  const userPools = await Pool.find({ createdBy: req.user.email });
  if (!pool) {
    res.status(400);
    throw new Error('Pool not found');
  }
  if (!pool || !userPools.includes(pool)) {
    res.status(400);
    throw new Error('User does not own this pool');
  }
  await Pool.deleteOne({ _id: req.params.id });
  res.status(200).json(pool.id);
};

// // TODO
// const updatePool = async (req, res) => {};

const joinPool = async (req, res) => {
  const pool = await Pool.findById(req.params.id);
  if (!pool) {
    res.status(400);
    throw new Error('Pool not found');
  }
  // if user in pool, update equity
  // else below
  pool.users = [...pool.users, { email: req.user.email, equity: req.body.equity }];
  await pool.save();
  res.status(200).json(pool);
};

const leavePool = async (req, res) => {
  const pool = await Pool.findById(req.params.id);
  if (!pool) {
    res.status(400);
    throw new Error('Pool not found');
  }
  pool.users.pull({ email: req.user.email });
  await pool.save();
  res.status(200).json(pool);
};

const getPoolsForListing = async (req, res) => {
  const pools = await Pool.find({ listingId: req.params.listingId });
  if (!pools) {
    res.status(400);
    throw new Error('Pools not found');
  }
  res.status(200).json(pools);
};

const getPoolsForUser = async (req, res) => {
  const user = req.user;
  const pools = await Pool.find({ 'users.email': user.email });
  if (!pools) {
    res.status(400);
  }
  res.status(200).json(pools);
};

const getPoolsCreatedByUser = async (req, res) => {
  const user = req.user;
  const pools = await Pool.find({ createdBy: user.email });
  if (!pools) {
    res.status(400);
    throw new Error('Pools not found');
  }
  res.status(200).json(pools);
};

const getTotalPoolEquity = async (req, res) => {
  const pool = await Pool.findById(req.params.id);
  if (!pool) {
    res.status(400);
    throw new Error('Pool not found');
  }
  const totalEquity = pool.users.reduce((total, user) => total + user.equity, 0);
  res.status(200).json(totalEquity);
};

const getPoolsCompletedForUser = async (req, res) => { 
  const userListings = (await Listing.find({ createdBy: req.user.email, status: 'Available' })).map(
    (listing) => listing._id,
  );
  const pools = [];
  for (const listingId of userListings) {
    const poolsForListing = await Pool.find({ listingId : listingId});
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
};

module.exports = {
  getPools,
  addPool,
  deletePool,
  joinPool,
  leavePool,
  getPoolsForListing,
  getTotalPoolEquity,
  getPoolsForUser,
  getPoolsCreatedByUser,
  getPoolsCompletedForUser,
};
