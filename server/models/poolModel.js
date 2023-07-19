const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const poolSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    private: {
      type: Boolean,
      required: true,
      default: false,
    },
    users: [
      {
        email: {
          type: String,
          ref: 'User',
          required: true,
        },
        equity: {
          type: Number,
          required: true,
        },
      },
    ],
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
      required: true,
    },
    createdBy: {
      type: String,
      ref: 'User',
      required: true,
    },
    totalValue: {
      type: Number,
      required: true,
    },
    remaining: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Pool', poolSchema);