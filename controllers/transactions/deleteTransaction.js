const { HttpError } = require("../../helpers/index.js");
const { Users } = require("../../models/modelUser.js");
const { Transaction } = require("../../models/transaction");

async function deleteTransaction(req, res, next) {
  const { id } = req.params;
  const balance = req.user.balance;

  const transaction = await Transaction.findById(id);
  if (!transaction) {
    return next(HttpError(404, "No such transaction"));
  }
  const userId = transaction.owner;

  await Transaction.findByIdAndRemove(id);

  const updatedUser = await Users.findByIdAndUpdate(
    userId,
    { balance: balance - transaction.sum },
    { new: true }
  );

  return res.status(200).json({ transaction, balance: updatedUser.balance });
}

module.exports = {
  deleteTransaction,
};
