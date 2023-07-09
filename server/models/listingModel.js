const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
    },
    description: {
      type: String
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
    },
    investmentType: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      maxLength: 5,
    },
    status: {
      type: String,
      enum: ['Available', 'Sold'],
      default: 'Available',
    },
    createdBy: {
      type: String,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Listing', listingSchema);
