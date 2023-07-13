const Listing = require('../models/listingModel');
const User = require('../models/userModel');

const getListings = async (req, res) => {
  const listings = await Listing.find({});
  res.status(200).json(listings);
};

const getListingsForUser = async (req, res) => {
  const listings = await Listing.find({ createdBy: req.user.email });
  res.status(200).json(listings);
};

// TODO : Add amazon s3 setup to store images and pass urls to db for listings images
const addListing = async (req, res) => {
  req.body.address = JSON.parse(req.body.address)
  req.body.details = JSON.parse(req.body.details)
  if (!req.body.name || !req.body.address || !req.body.price || !req.user.email) {
    res.status(400);
    throw new Error('Please specify a name, address, price, and email');
  }

  const images = req.files.map(file => file.location); // Retrieve the file paths of all the uploaded images
  
  const listing = await Listing.create({
    ...req.body,
    images,
    createdBy: req.user.email,
  });
  res.status(200).json(listing);
};

const updateListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    res.status(400);
    throw new Error('listing not found');
  }
  const updatedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    { ...req.body, images: [] },
    {
      new: true,
    },
  );
  res.status(200).json(updatedListing);
};

const deleteListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    res.status(400);
    throw new Error('Listing not found');
  }
  await Listing.deleteOne({ _id: req.params.id });
  res.status(200).json({ id: req.params.id });
};

const sellListing = async (req, res) => {
  const listing = await Listing.findById(req.params.listingId);
  if (!listing) {
    res.status(400);
    throw new Error('Listing not found');
  }
  const userListings = await Listing.find({ createdBy: req.user.email });
  if (!userListings.includes(listing)) {
    res.status(400);
    throw new Error('User does not own this listing');
  }
  const pool = await Pool.findById(req.params.poolId);
  if (!pool) {
    res.status(400);
    throw new Error('Pool not found');
  }
  const members = pool.users;
  members.forEach(async (member) => {
    const user = await User.findOne({ email: member.email });
    user.ownerships.push({ listingId: listing.id, amount: member.equity });
    await user.save();
  });
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
