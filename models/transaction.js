const mongoose = require("mongoose");
const {
  transactionSchema,
} = require("../schema/mongooseSchema/transactionSchema");

const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = {
  Transaction,
};
