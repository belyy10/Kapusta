const { Unauthorized } = require("http-errors");
const { Users } = require("../../models/modelUser.js");
const { Transaction } = require("../../models/transaction.js");
const { BadRequest } = require("http-errors");

async function reportsByCategoryByMonth(req, res, next) {
  const { _id } = req.user;
  const { month, year, type } = req.query;

  if (month && year && type) {
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
            type: type,
          },
        },
        {
          $group: {
            _id: "$category",
            total: { $sum: "$sum" },
          },
        },
      ]);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  } else {
    return next(BadRequest("Bad Request"));
  }
}

module.exports = { reportsByCategoryByMonth };
