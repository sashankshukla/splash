const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    details: {
      type: Mongoose.Schema.Types.Mixed,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      minLength: 1,
      maxLength: 5,
    },
    status: {
      type: String,
      enum: ['Available', 'Sold'],
      default: 'Available',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Listing', listingSchema);
