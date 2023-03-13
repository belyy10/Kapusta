const { Unauthorized } = require("http-errors");
const { Users } = require("../../models/modelUser.js");
const { Transaction } = require("../../models/transaction.js");
const { BadRequest } = require("http-errors");
const { nanoid } = require("nanoid");

async function reportsByCategoryByMonth(req, res, next) {
  const { _id } = req.user;
  const { type, date } = req.query;

  // const dateYear = Number(date.slice(0, 4));
  // const dateMon = Number(date.slice(5, 7));

  if (!type || !date) {
    return next(BadRequest("Bad Request"));
  }

  const userId = await Users.findById({ _id });
  if (!userId) {
    return next(Unauthorized("Not authorized"));
  }

  try {
    const result = await Transaction.aggregate([
      {
        $match: {
          owner: _id,
          type: type,
          $expr: {
            $and: [
              // { $eq: [dateMon, { $month: "$date" }] },
              // { $eq: [dateYear, { $year: "$date" }] },
              { $eq: [date.mm, { $month: "$date.mm" }] },
              { $eq: [date.year, { $year: "$date.year" }] },
            ],
          },
        },
      },

      {
        $group: {
          _id: "$category",
          sum: { $sum: "$sum" },
        },
      },
      {
        $project: {
          _id: 0,
          id: nanoid(),
          name: "$_id",
          sum: "$sum",
        },
      },

      {
        $sort: { sum: 1 },
      },
    ]);

    return res.status(200).json(result);
  } catch (error) {
    return next(BadRequest("Bad Request"));
  }
}

module.exports = { reportsByCategoryByMonth };
