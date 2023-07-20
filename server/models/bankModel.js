const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bankSchema = new Schema(
  {
    accountName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
      unique: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Bank', bankSchema);
