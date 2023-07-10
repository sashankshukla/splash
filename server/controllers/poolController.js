const Pool = require('../models/poolModel');

const addPool = async (req, res) => {
  if (!req.body.name || !req.body.private || !req.body.users || !req.body.listingId) {
    res.status(400);
    throw new Error('Please specify a name, private, users, and listingId');
  }
  const pool = await Pool.create({
    ...req.body,
    createdBy: req.user.email,
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

// TODO
const updatePool = async (req, res) => {};

const joinPool = async (req, res) => {
  const pool = await Pool.findById(req.params.id);
  if (!pool) {
    res.status(400);
    throw new Error('Pool not found');
  }
  pool.users.push({ email: req.user.email, equity: req.body.equity });
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
  const pools = await Pool.find({ users: { $elemMatch: { userId: user.id } } });
  if (!pools) {
    res.status(400);
    throw new Error('Pools not found');
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

module.exports = {
  addPool,
  deletePool,
  joinPool,
  leavePool,
  getPoolsForListing,
  getTotalPoolEquity,
  getPoolsForUser,
  getPoolsCreatedByUser,
};
