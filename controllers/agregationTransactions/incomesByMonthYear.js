const { Transaction } = require("../../models/transaction");
const { BadRequest } = require("http-errors");
const { HttpError } = require("../../helpers");

const incomesByMonthYear = async (req, res, next) => {
  if (!req.user) return next(HttpError(404, "User not found"));
  const { _id } = req.user;

  try {
    const incomesAgregate = await Transaction.aggregate([
      {
        $match: {
          owner: _id,
          type: "incomes",
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
          incomes: { $sum: "$sum" },
        },
      },
      {
        $sort: { _id: -1 },
      },
    ]);
    return res.status(200).json(incomesAgregate);
  } catch {
    return next(BadRequest("Bad Request"));
  }
};

module.exports = { incomesByMonthYear };
