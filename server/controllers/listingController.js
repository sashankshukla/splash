const Listing = require('../models/Listing');
const User = require('../models/User');

const getListings = async (req, res) => {
  const listings = await Listing.find({});
  res.status(200).json(listings);
};

const getListingsForUser = async (req, res) => {
  const user = await User.find({ email: req.body.email });
  const listings = await Listing.find({ user: user.id });
  res.status(200).json(listings);
};

const addListing = async (req, res) => {
  if (!req.body.name || !req.body.address || !req.body.price || !req.body.email) {
    res.status(400);
    throw new Error('Please specify a name, address, price, and email');
  }

  const user = await User.find({ email: req.body.email });
  const listing = await Listing.create({
    ...req.body,
    user: user.id,
  });

  res.status(200).json(listing);
};

const updateListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    res.status(400);
    throw new Error('listing not found');
  }

  const updatedListing = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedListing);
};

const deleteListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    res.status(400);
    throw new Error('Listing not found');
  }

  await goal.remove();
  res.status(200).json({ id: req.params.id });
};

const sellListing = async (req, res) => {
  const listing = await Listing.findById(req.params.listingId);
  if (!listing) {
    res.status(400);
    throw new Error('Listing not found');
  }
  const pool = await Pool.findById(req.params.poolId);
  if (!pool) {
    res.status(400);
    throw new Error('Pool not found');
  }
  // give each user their equity
  const members = pool.users;
  members.forEach(async (member) => {
    const User = await User.findById(member.userId);
    User.ownerships.push({ listingId: listing.id, amount: member.equity });
    await User.save();
  });
  // set status to sold
  listing.status = 'Sold';
  await listing.save();
  res.status(200).json(listing);
};

// TODO : Filtering listings

module.exports = {
  getListings,
  getListingsForUser,
  addListing,
  updateListing,
  deleteListing,
  sellListing,
};
