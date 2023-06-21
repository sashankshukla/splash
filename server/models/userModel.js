const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    pools: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Pool',
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
