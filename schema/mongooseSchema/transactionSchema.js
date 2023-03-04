const mongoose = require("mongoose");
const transactionSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      //   default: Date.now,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sum: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "Transactions",
  }
);

module.exports = { transactionSchema };
