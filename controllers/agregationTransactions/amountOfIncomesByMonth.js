const { Unauthorized } = require("http-errors");
const { Users } = require("../../models/modelUser.js");
const { Transaction } = require("../../models/transaction.js");

async function amountOfIncomesByMonth(req, res, next) {
  const { _id } = req.user;
  const { year, month } = req.params;

  const userId = await Users.findById({ _id });
  if (!userId) {
    return next(Unauthorized("Not authorized"));
  }

  try {
    const result = await Transaction.aggregate([
      {
        $match: {
          owner: _id,
          year: year,
          month: month,
          type: "incomes",
        },
      },
      {
        $group: {
          _id: null,
          incomes: { $sum: "$sum" },
        },
      },
      {
        $project: { _id: 0, incomes: "$incomes" },
      },
    ]);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { amountOfIncomesByMonth };
