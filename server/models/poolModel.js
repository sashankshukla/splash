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
    },
    users: [
      {
        userId: {
          type: Schema.Types.ObjectId,
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
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Pool', poolSchema);
