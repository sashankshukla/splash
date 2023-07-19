const User = require('../models/userModel');
const Bank = require('../models/bankModel');

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
  const form = req.body;
  console.log("form in server");
  console.log(form);
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }
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
    const result = Bank.find({accountName: form.accountName, accountNumber: form.accountNumber, bankName: form.bankName, userEmail: req.user.email, approved: true})
    if(result.length > 0){
      console.log("Found a user with approved banking information");
      console.log(result);
      return true;
    } else {
      // approved payment not found we make a payment with user request default for approved set to 0, admin has to flag payment as approved first
       Bank.create({
      accountName: form.accountName,
      accountNumber: form.accountNumber,
      bankName: form.bankName,
      userEmail: req.user.email
    });
      return false;
    };
  };
  const paymentStatus = validatePayment(form);
  if(paymentStatus) {
    const updatedUser = await User.findOneAndUpdate(
      { email: user.email },
      { $inc: { funds: parseFloat(form.amount) } },
      { new: true, // Return the updated document
      useFindAndModify: false,
    });
  
    res.status(200).json(updatedUser);
  } else {
    res.status(400).json();
  }
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
  res.status(200).json(user);
}

module.exports = { addUser, getUserAssets, addFunds, getUser};
