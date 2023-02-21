const { HttpError } = require("../helpers/index.js");
const { Users } = require("../models/modelUser.js");
const { Transaction } = require("../models/transaction");

async function getTransactions(req, res, next) {
  const userId = req.user._id;
  const { type } = req.query;
  const transactions = await Transaction.find({ owner: userId, type: type });
  return res.json({ transactions });
}

async function createExpense(req, res, next) {
  const userId = req.user._id;
  const balance = req.user.balance;
  const expenses = await Transaction.create({
    ...req.body,
    owner: userId,
  });
  console.log(expenses);

  const updatedUser = await Users.findByIdAndUpdate(
    userId,
    { balance: balance - req.body.sum },
    { new: true }
  );

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      expenses,
      balance: updatedUser.balance,
    },
  });
}

async function createIncome(req, res, next) {
  const userId = req.user._id;
  const balance = req.user.balance;
  const incomes = await Transaction.create({
    ...req.body,
    owner: userId,
  });

  const updatedUser = await Users.findByIdAndUpdate(
    userId,
    { balance: balance + req.body.sum },
    { new: true }
  );

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      incomes,
      balance: updatedUser.balance,
    },
  });
}

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
  createExpense,
  createIncome,
  getTransactions,
};
