const { HttpError } = require("../helpers/index.js");
const { Users } = require("../models/modelUser.js");
const { Transaction, addIncome } = require("../models/transaction");
const { listExpenses, addExpenses } = require("../models/transaction");

// getting all expenses
async function getAllExpenses(req, res, next) {

    const usersId = req.user;
    const expenses = await listExpenses(usersId);

    res.json({
        status: 'success',
        code: 200,
        data: {
            ...expenses
        }
    });
}
// add a new expenses
async function createExpenses(req, res, next) {
    const userId = req.user._id;
    const balance = req.user.balance;
    const expenses = await addExpenses({
        ...req.body,
        owner: userId
    });
    // find user and update balance when creating a new expenses
    await Users.findByIdAndUpdate(userId, {balance: balance - req.body.sum});

    res.status(201).json({
        tatus: 'success',
        code: 202,
        data: {
            expenses,
            balance: balance - req.body.sum,
        }
    });
};

// add a new Income
async function createIncome(req, res, next) {

    const userId = req.user._id;
    const balance = req.user.balance;
    const incomes = await addIncome({
        ...req.body,
        owner: userId
    }); 
    // find user and update balance when add new Income
    await Users.findByIdAndUpdate(userId, {balance: balance + req.body.sum});

    res.status(201).json({
        status: 'success',
        code: 202,
        data: {
            incomes,
            balance: balance + req.body.sum,
        }
    });
};
// delete transaction
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
  getAllExpenses,
  createExpenses,
  createIncome
};
