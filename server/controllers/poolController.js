const Pool = require('../models/poolModel');

const addPool = async (req, res) => {
  if (!req.body.name || !req.body.private || !req.body.users || !req.body.listingId) {
    res.status(400);
    throw new Error('Please specify a name, private, users, and listingId');
  }

  const pool = await Pool.create({
    ...req.body,
  });
  res.status(200).json(pool);
};

const deletePool = async (req, res) => {
  const pool = await Pool.findById(req.params.id);
  if (!pool) {
    res.status(400);
    throw new Error('Pool not found');
  }
  await pool.remove();
  res.status(200).json(pool.id);
};

const updatePool = async (req, res) => {};

const joinPool = async (req, res) => {
  const pool = await Pool.findById(req.params.id);
  if (!pool) {
    res.status(400);
    throw new Error('Pool not found');
  }
  // TODO : Needs checking of not going over listing total value
  pool.users.push(req.body);
  await pool.save();
  res.status(200).json(pool);
};

const leavePool = async (req, res) => {
  const pool = await Pool.findById(req.params.id);
  if (!pool) {
    res.status(400);
    throw new Error('Pool not found');
  }
  pool.users.pull(req.body);
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
  const pools = await Pool.find({ users: { $elemMatch: { userId: req.params.userId } } });
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
};
