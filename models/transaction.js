const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
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
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    }
  },
  {
    versionKey: false,
    timestamps: true,
    collection: "Transactions",
  }
);
const Transaction = mongoose.model("transaction", schema);

module.exports = {
  Transaction,
};
