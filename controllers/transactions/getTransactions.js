const { Transaction } = require("../../models/transaction");

async function getTransactions(req, res, next) {
  const userId = req.user._id;
  const { type } = req.query;
  const transactions = await Transaction.find({ owner: userId, type: type });
  return res.json({ transactions });
}

module.exports = {
  getTransactions,
};
