const mongoose = require('mongoose');

const contribution = new mongoose.Schema({
  userId: { type: String, required: true },
  contribution: { type: Number, required: true },
});

const poolSchema = new mongoose.Schema(
  {
    poolId: { type: String, required: true },
    listingId: { type: String, required: true },
    title: { type: String, required: true },
    totalFunding: { type: Number, required: true },
    participants: { type: [contribution], required: true },
    createdBy: { type: String, required: true },
    status: Boolean,
  },
  { timestamps: true },
);

export const Pool = mongoose.model('Pool', poolSchema);
