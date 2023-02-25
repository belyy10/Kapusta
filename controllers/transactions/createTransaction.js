const { Users } = require("../../models/modelUser.js");
const { Transaction } = require("../../models/transaction");

async function createTransaction(req, res, next) {
  const userId = req.user._id;
  const balance = req.user.balance;
  const isExpense = req.path.includes("expenses");

  const transactionData = {
    ...req.body,
    owner: userId,
  };

  if (isExpense) {
    transactionData.sum = -transactionData.sum;
  }

  const transaction = await Transaction.create(transactionData);

  const updatedUser = await Users.findByIdAndUpdate(
    userId,
    { balance: balance + transactionData.sum },
    { new: true }
  );

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      transaction,
      balance: updatedUser.balance,
    },
  });
}

module.exports = { createTransaction };
