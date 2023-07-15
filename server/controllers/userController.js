const User = require('../models/userModel');

const addUser = async (req, res) => {
  console.log(req.body);
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

const addFunds = async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }
  user.funds += req.body.funds;
  await user.save();
  res.status(200).json(user);
};

const getUserAssets = async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }
  res.status(200).json(user.ownerships);
};

const getUser = async (req,res) => {
  const userEmail = req.params.email;
  const user = await User.findOne({ email: userEmail });
  console.log("FOUND USER ");
  console.log(user);
  res.status(200).json(user);
}

const increaseUserFunds = async (req,res) => {
  console.log("server side update user")
  const userEmail = req.params.email;
  const form = req.body;
  console.log("form in server");
  console.log(userEmail);
  console.log(form);
  function validatePayment(form) {
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
    if (form.bankName.trim() === "") {
      return false;
    }
    // All checks passed, transfer is valid
    return true;
  };
  const paymentStatus = validatePayment(form);
  if(paymentStatus) {
    const updatedUser = await User.findOneAndUpdate(
      { email: userEmail },
      { $inc: { funds: parseFloat(form.amount) } },
      { new: true, // Return the updated document
      useFindAndModify: false,
    });
    console.log("successfully updated user");
    console.log(updatedUser);
    res.status(200).json(updatedUser);
  } else {
    res.status(400).json();
  }
};

module.exports = { addUser, getUserAssets, addFunds, getUser ,increaseUserFunds};
