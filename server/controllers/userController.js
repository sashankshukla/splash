const { Configuration, OpenAIApi } = require('openai');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Bank = require('../models/bankModel');
const Listing = require('../models/listingModel');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'splashfinance455@gmail.com', // Your Gmail email address
    pass: process.env.GMAIL_API, // Your Gmail password or App Password
  },
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

const runPrompt = asyncHandler(async (prompt) => {
  const gptResponse = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 2048,
    temperature: 0.7,
  });
  return gptResponse.data.choices[0].text;
});

const generatePrompt = (listing, purchasePrice, purchaseDate, currentDate) => {
  let prompt =
    'Provide a prediction of the price for a given investment for each day starting from the purchase date to the current date.';
  prompt +=
    '\n Your prediction should be an array of floats where each element represents the price on a day starting from the purchase date to the current date.';
  prompt +=
    '\n The prediction should be somewhat realistic but try not to have like a constant increase or decrease in price.';
  prompt += '\n Provide just the array in your response and nothing else.';
  prompt +=
    '\n make sure to use the information provided about the listing, its buying price etc in your prediction';
  prompt += `\n investment name : ${listing.name}`;
  prompt += `\n investment address : ${JSON.stringify(listing.address)}`;
  prompt += `\n investment type : ${listing.investmentType}`;
  prompt += `\n purchasePrice : ${purchasePrice}`;
  prompt += `\n purchaseDate : ${purchaseDate}`;
  prompt += `\n currentDate : ${currentDate}`;
  return prompt;
};

const addUser = asyncHandler(async (req, res) => {
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
  const emailContent = `
    Welcome to Splash Finance ${req.body.name}, prepare to make a splash into the world of finance!
    Start by adding funds to your account and start browsing, join pools or create pools.
  `;
  const mailOptions = {
    from: 'splash@frankeyhe.dev',
    to: req.body.userEmail,
    subject: 'Splash Finance: Funding has been denied.',
    text: emailContent,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(404).json(error);
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({});
    }
  });
  res.status(201).json(user);
});

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

const addFunds = asyncHandler(async (req, res) => {
  const form = req.body;
  const paymentStatus = validatePayment(form);

  try {
    const bank = await Bank.findOne({
      accountName: form.accountName,
      accountNumber: form.accountNumber,
      bankName: form.bankName,
      userEmail: req.user.email,
    });
    if (!paymentStatus) {
      res.status(400).json({ message: 'Invalid payment details please check the form.' });
      return;
    }
    if (!bank) {
      res.status(400).json({ message: 'Account does not exist please try again.' });
      return;
    }

    if (!bank.approved) {
      res.status(400).json({
        message:
          'Bank account not approved. Please wait util our Finance Team verifies your account.',
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
});

const addAccount = asyncHandler(async (req, res) => {
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
    res
      .status(400)
      .json({ message: 'Oops! Seems like the information provided is not in the right format!' });
    return;
  }
  const alreadyAdded = await Bank.findOne({
    ...form,
    userEmail: req.user.email,
  });
  if (alreadyAdded) {
    res
      .status(400)
      .json({
        message: `Seems like this account has already been added current status is: ${
          alreadyAdded.approved ? 'Approved' : 'Pending Admin Review'
        }`,
      });
    return;
  }
  const bank = await Bank.create({
    ...form,
    userEmail: req.user.email,
  });
  res.status(200).json(bank);
});

const getUserAssets = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }
  res.status(200).json(user.ownerships);
});

const getUser = asyncHandler(async (req, res) => {
  const originalUser = req.user;
  await getUserAssetPerformance(originalUser);
  const user = originalUser.toObject();
  user.ownerships = await Promise.all(
    user.ownerships.map(async (ownership) => {
      const listing = await Listing.findById(ownership.listingId);
      const prices = user.priceDictionary
        ? user.priceDictionary[ownership.listingId]
        : [listing.price];
      return {
        ...ownership,
        name: listing.name,
        purchasePrice: listing.price,
        currentPrice: prices[prices.length - 1],
      };
    }),
  );
  res.status(200).json(user);
});

const getAllUser = asyncHandler(async (req, res) => {
  try {
    const usersList = await User.find({});
    if (!usersList) {
      throw new Error('Unable to get all users for admin');
    }

    res.status(200).json(usersList);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const getPendingFunds = asyncHandler(async (req, res) => {
  try {
    const pendingFunds = await Bank.find({ approved: false });
    if (!pendingFunds) {
      throw new Error('Unable to get all users for admin');
    }

    res.status(200).json(pendingFunds);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const status = req.body.status;
    const updatedUser = await User.findOneAndUpdate(
      { email: req.params.email },
      { $set: { active: status } },
      { new: true }, // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const allUsers = await User.find();

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const updateBank = asyncHandler(async (req, res) => {
  try {
    const status = req.body.status;
    const updatedBank = await Bank.findOneAndUpdate(
      { _id: req.params.bankId },
      { $set: { approved: status } },
      { new: true },
    );

    if (!updatedBank) {
      return res.status(404).json({ error: 'User not found' });
    }

    const allPending = await Bank.find({ approved: false });

    res.status(200).json(allPending);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const deleteBank = asyncHandler(async (req, res) => {
  try {
    const updatedBank = await Bank.findOneAndDelete({ _id: req.params.bankId });

    if (!updatedBank) {
      return res.status(404).json({ error: 'User not found' });
    }

    const allPending = await Bank.find({ approved: false });

    res.status(200).json(allPending);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const getUserAssetPerformance = asyncHandler(async (user) => {
  if (!user) {
    res.status(400);
    throw new Error('User not found');
  }

  const assets = user.ownerships;
  const currentDate = new Date(formatDate(new Date()));
  const priceDictionary = {};

  for (const asset of assets) {
    const listing = await Listing.findById(asset.listingId);
    const purchaseDate = new Date(formatDate(listing.updatedAt));
    const gptResponse = await runPrompt(
      generatePrompt(listing, asset.amount, purchaseDate, currentDate),
    );
    const predictions = JSON.parse(gptResponse);
    priceDictionary[asset.listingId] = predictions;
  }
  user.priceDictionary = priceDictionary;
  await user.save();
});

module.exports = {
  addUser,
  getUserAssets,
  addFunds,
  getUser,
  addAccount,
  getAllUser,
  getPendingFunds,
  updateUser,
  updateBank,
  deleteBank,
};
