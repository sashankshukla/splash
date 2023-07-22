const { Configuration, OpenAIApi } = require('openai');

const User = require('../models/userModel');
const Bank = require('../models/bankModel');
const Listing = require('../models/listingModel');

const configuration = new Configuration({
  apiKey: `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`,
});
const openai = new OpenAIApi(configuration);

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

const runPrompt = async (prompt) => {
  const gptResponse = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 2048,
    temperature: 0.7,
  });
  return gptResponse.data.choices[0].text;
};

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
      const prices = user.priceDictionary[ownership.listingId];
      return {
        ...ownership,
        name: listing.name,
        purchasePrice: listing.price,
        currentPrice: prices ? prices[prices.length - 1] : listing.price,
      };
    }),
  );
  res.status(200).json(user);
};

const getUserAssetPerformance = async (req, res) => {
  const user = req.user;
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
      generatePrompt(listing, asset.amount , purchaseDate, currentDate),
    );
    const predictions = JSON.parse(gptResponse);
    priceDictionary[asset.listingId] = predictions;
  }
  user.priceDictionary = priceDictionary;
  await user.save();
  res.status(200).json(priceDictionary);
};

module.exports = { addUser, getUserAssets, addFunds, getUser, addAccount, getUserAssetPerformance };
