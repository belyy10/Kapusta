const { Users } = require("../../models/modelUser.js");
const { Transaction } = require("../../models/transaction");

async function createExpense(req, res, next) {
  const userId = req.user._id;
  const balance = req.user.balance;
  const expenses = await Transaction.create({
    ...req.body,
    owner: userId,
  });

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

module.exports = {
  createExpense,
};
