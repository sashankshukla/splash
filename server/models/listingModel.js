const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema(
  {
    listingId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    images: { type: [Image], required: true },
    seller: { type: String, required: true },
    status: Boolean,
  },
  { timestamps: true },
);

export const Listing = mongoose.model('Listing', listingSchema);
