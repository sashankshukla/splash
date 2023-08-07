const Pool = require('../models/poolModel');
const Listing = require('../models/listingModel');
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

const getPools = asyncHandler(async (req, res) => {
  const pools = await Pool.find({ private: false });
  res.status(200).json(pools);
});

const getPrivatePool = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const pool = await Pool.findById(id);
  if (!pool) {
    res.status(400);
    throw new Error('Pool not found');
  }
  if (pool.private) {
    res.status(200).json(pool);
  } else {
    res.status(400);
    throw new Error('This pool is a public pool!');
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
  const pools = await Pool.find({ 'users.email': user.email });
  if (!pools) {
    res.status(400);
    throw new Error('Pools not found');
  }
  res.status(200).json(pools);
});

const getPoolsCreatedByUser = asyncHandler(async (req, res) => {
  const user = req.user;
  const pools = await Pool.find({ createdBy: user.email });
  if (!pools) {
    res.status(400);
    throw new Error('No pools found');
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
  if (!req.body.name || !req.body.listingId) {
    res.status(400);
    throw new Error('Please specify a name, private, and listingId');
  }
  const listing = await Listing.findById(req.body.listingId);
  if (!listing) {
    res.status(400);
    throw new Error('Listing not found');
  }
  if (req.body.contribution <= 0) {
    res.status(400);
    throw new Error('Invalid contribution, you must contribute more than $0!');
  }
  if (req.body.contribution > listing.price) {
    res.status(400);
    throw new Error('You cannot contribute more than the selling price');
  }
  const pool = await Pool.create({
    ...req.body,
    createdBy: req.user.email,
    users: [{ email: req.user.email, equity: req.body.contribution }],
    totalValue: listing.price,
    remaining: listing.price - req.body.contribution,
    private: req.body.private,
  });
  res.status(200).json(pool);
});

const joinPool = asyncHandler(async (req, res) => {
  const pool = await Pool.findById(req.params.id);
  if (!pool) {
    res.status(400);
    throw new Error('Seems like the pool you are trying to join does not exist!');
  }
  if (pool.remaining < req.body.equity) {
    res.status(400);
    throw new Error('Seems like the you are trying to contribute over the remaining balance!');
  }
  if (req.body.equity <= 0) {
    res.status(400);
    throw new Error('You must contribute more than $0 to join a pool!');
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
  const poolUser = pool.users.find((user) => user.email === req.user.email);
  if (!poolUser) {
    res.status(400);
    throw new Error('User is not part of this pool');
  }
  if (req.body.equity <= 0) {
    res.status(400);
    throw new Error('Your ammended contribution must be more than 0');
  }
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
  const poolUser = pool.users.find((user) => user.email === req.user.email);
  if (!poolUser) {
    res.status(400);
    throw new Error('User is not part of this pool');
  }
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
  if (!pool) {
    res.status(400);
    throw new Error('Pool not found');
  }
  const listing = await Listing.findById(pool.listingId);
  if (listing.createdBy !== user.email) {
    res.status(400);
    throw new Error('User does not own listing for pool');
  }
  const userEmails = pool.users.map((user) => user.email);
  const emailContent = `
    Hello from Splash Finance!,
    Unfortunately it appears that your pool for ${listing.name} has been rejected.
    Pool Id: ${pool.listingId}
    Best of luck on your next splash!

    Best regards,
    Splash Finance`;

  const mailOptions = {
    from: 'splash@frankeyhe.dev',
    to: userEmails,
    subject: `Splash Finance: Pool for ${listing.name} has been rejected :(`,
    text: emailContent,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(404).json(error);
    } else {
      res.status(200).json({});
    }
  });
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
