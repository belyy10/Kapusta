const { Unauthorized } = require("http-errors");
const { Users } = require("../../models/modelUser.js");
const { Transaction } = require("../../models/transaction.js");
const { BadRequest } = require("http-errors");
const { nanoid } = require("nanoid");


async function reportsByCategoryByMonth(req, res, next) {
  const { _id } = req.user;
  const { type, date } = req.query;

  if (!type || !date) {
    return next(BadRequest("Bad Request"));
  }

  const userId = await Users.findById({ _id });   
  if (!userId) {
    return next(Unauthorized("Not authorized"));
  };

  try {
    const result = await Transaction.aggregate([
      {
        $match: {
          owner: _id,
          type: type,
          $expr: {
            $and: [
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
          name: "$_id",
          sum: "$sum",
          date: date,
          type: type,
        },
      },
      {
        $sort: { sum: 1 },
      },
    ]);

      const resId = result.map( result => {
        const id ={
          id: nanoid(),
          date: result.date,
          name: result.name, 
          sum: result.sum,
          type: result.type,
        };
        return id;
  })

    return res.status(200).json(resId);
  } catch (error) {
    return next(BadRequest("Bad Request"));
  }
}

module.exports = { reportsByCategoryByMonth };
