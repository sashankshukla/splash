const User = require('../models/User');

const addUser = async (req, res) => {
  if (!req.body.name || !req.body.email) {
    res.status(400);
    throw new Error('Please specify a name and email');
  }

  // check if user already exists
  const existingUser = await User.find({ email: req.body.email });
  if (existingUser) {
    res.status(200).json(existingUser);
  }

  const user = await User.create({
    ...req.body,
  });

  res.status(200).json(user);
};

const addFunds = async (req, res) => {
  const user = await User.find({ email: req.body.email });
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }
  user.funds += req.body.funds;
  await user.save();
  res.status(200).json(user);
};

const getUserAssets = async (req, res) => {
  const user = await User.find({ email: req.body.email });
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }
  res.status(200).json(user.ownerships);
};

module.exports = { addUser, getUserAssets, addFunds };
