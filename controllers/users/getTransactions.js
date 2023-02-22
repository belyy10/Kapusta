const { Users } = require("../../models/modelUser");

async function getTransactions(req, res, next) {
  const { user } = req;
  const userWithTransactions = await Users.findById(user._id).populate(
    "transaction"
  );
  return res.status(200).json({
    transactions: userWithTransactions.transactions,
  });
}

module.exports = { getTransactions };
