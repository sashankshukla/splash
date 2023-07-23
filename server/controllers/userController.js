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
    admin: false,
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
  
  

  const paymentStatus = validatePayment(form);

  try {
    const bank = await Bank.findOne({
      accountName: form.accountName,
      accountNumber: form.accountNumber,
      bankName: form.bankName,
      userEmail: req.user.email,
    });

    

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
  try {
    const originalUser = await User.findOne({ email: req.params.email });
    if (!originalUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = originalUser.toObject();

    user.ownerships = await Promise.all(
      user.ownerships.map(async (ownership) => {
        const listing = await Listing.findById(ownership.listingId);
        if (!listing) {
          return {
            ...ownership,
            name: 'Listing not found',
            purchasePrice: 0,
            currentPrice: 0,
          };
        }

        return {
          ...ownership,
          name: listing.name,
          purchasePrice: listing.price,
          currentPrice: listing.price,
        };
      })
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllUser = async (req, res) => {
  try {
    const usersList = await User.find({});
    if(!usersList) {
      throw new Error("Unable to get all users for admin");
    };
    
    
    res.status(200).json(usersList);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getPendingFunds = async (req, res) => {
  try {
    const pendingFunds = await Bank.find({approved: false});
    if(!pendingFunds) {
      throw new Error("Unable to get all users for admin");
    };
    
    
    res.status(200).json(pendingFunds);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    
    const status = req.body.status;
    const updatedUser = await User.findOneAndUpdate(
      { email: req.params.email },
      { $set: { active: status } },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    
    

    const allUsers = await User.find();

    
    

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateBank = async (req, res) => {
  try {
    
    const status = req.body.status;
    const updatedBank = await Bank.findOneAndUpdate(
      { _id: req.params.bankId },
      { $set: { approved: status } },
      { new: true }
    );

    if (!updatedBank) {
      return res.status(404).json({ error: 'User not found' });
    }

    
    

    const allPending = await Bank.find({approved: false});

    
    

    res.status(200).json(allPending);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteBank = async (req, res) => {
  try {
    
    const updatedBank = await Bank.findOneAndDelete(
      { _id: req.params.bankId },
    );

    if (!updatedBank) {
      return res.status(404).json({ error: 'User not found' });
    }

    

    const allPending = await Bank.find({approved: false});

    
    

    res.status(200).json(allPending);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { addUser, getUserAssets, addFunds, getUser, addAccount , getAllUser, getPendingFunds, updateUser, updateBank,deleteBank};
