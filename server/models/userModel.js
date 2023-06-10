const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    portfolioValue: { type: Number, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
