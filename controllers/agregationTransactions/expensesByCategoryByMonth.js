const { Unauthorized } = require("http-errors");
const { Users } = require("../../models/modelUser.js");
const { Transaction } = require("../../models/transaction.js");

async function expensesByCategoryByMonth(req, res, next) {
  const { _id } = req.user;
  // const { month, year } = req.body;

  const userId = await Users.findById({ _id });
  if (!userId) {
    return next(Unauthorized("Not authorized"));
  }

  try {
    const result = await Transaction.aggregate([
      {
        $match: {
          owner: _id,
          // year: year,
          // month: month,
          type: "expenses",
        },
      },
      {
        $group: {
          _id: "$category",
          expenses: { $sum: "$sum" },
        },
      },
    ]);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { expensesByCategoryByMonth };
