const User = require('../models/userModel');
const Bank = require('../models/bankModel');
const Listing = require('../models/listingModel');

const addUser = async (req, res) => {
  if (!req.body.name || !req.body.email) {
    res.status(400);
    throw new Error('Please specify a name and email');
  }
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    res.status(200).json(existingUser);
    return;
  }
  const user = await User.create({
    ...req.body,
    ownerships: [],
  });
  res.status(201).json(user);
};

const validatePayment = (form) => {
  if (!form.accountName || !form.accountNumber || !form.bankName || !form.amount) {
    return false;
  }
  // Check if account number is a valid number
  if (isNaN(form.accountNumber) || form.accountNumber <= 0) {
    return false;
  }
  // Check if amount is a valid number
  if (isNaN(form.amount) || form.amount <= 0) {
    return false;
  }
  // Check if bank name is not empty
  if (form.bankName.trim() === '') {
    return false;
  }
  return true;
};

const addFunds = async (req, res) => {
  const form = req.body;
  console.log(form);

  const paymentStatus = validatePayment(form);

  try {
    const bank = await Bank.findOne({
      accountName: form.accountName,
      accountNumber: form.accountNumber,
      bankName: form.bankName,
      userEmail: req.user.email,
    });

    console.log(bank);

    if (!paymentStatus || !bank) {
      res.status(400).json({ message: 'Invalid payment details' });
      return;
    }

    if (!bank.approved) {
      res.status(400).json({
        message:
          'Bank account not approved. Please wait till our Finance Team verifies your account.',
      });
      return;
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: req.user.email },
      { $inc: { funds: parseFloat(form.amount) } },
      {
        new: true, // Return the updated document
        useFindAndModify: false,
      },
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const addAccount = async (req, res) => {
  const form = req.body;
  function validateAccount(form) {
    if (!form.accountName || !form.accountNumber || !form.bankName) {
      return false;
    }
    // Check if account number is a valid number
    if (isNaN(form.accountNumber) || form.accountNumber <= 0) {
      return false;
    }
    // Check if bank name is not empty
    if (form.bankName.trim() === '') {
      return false;
    }
    return true;
  }
  const status = validateAccount(form);
  if (!status) {
    res.status(400).json({ message: 'Invalid bank' });
    return;
  }
  const bank = await Bank.create({
    ...form,
    userEmail: req.user.email,
  });
  res.status(200).json(bank);
};

const getUserAssets = async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }
  res.status(200).json(user.ownerships);
};

const getUser = async (req, res) => {
  const originalUser = await User.findOne({ email: req.params.email });
  const user = originalUser.toObject();

  user.ownerships = await Promise.all(
    user.ownerships.map(async (ownership) => {
      const listing = await Listing.findById(ownership.listingId);
      return {
        ...ownership,
        name: listing.name,
        purchasePrice: listing.price,
        currentPrice: listing.price,
      };
    }),
  );
  res.status(200).json(user);
};

module.exports = { addUser, getUserAssets, addFunds, getUser, addAccount };
