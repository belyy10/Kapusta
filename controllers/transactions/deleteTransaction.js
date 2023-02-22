const { HttpError } = require("../../helpers/index.js");
const { Transaction } = require("../../models/transaction");

async function deleteTransaction(req, res, next) {
  const { id } = req.params;
  const transaction = await Transaction.findById(id);
  if (!transaction) {
    return next(HttpError(404, "No such transaction"));
  }
  await Transaction.findByIdAndRemove(id);
  return res.status(200).json(transaction);
}

module.exports = {
  deleteTransaction,
};
