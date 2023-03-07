const { Unauthorized } = require("http-errors");
const { Users } = require("../../models/modelUser.js");
const { Transaction } = require("../../models/transaction.js");
const { BadRequest } = require("http-errors");
const { nanoid } = require("nanoid");

async function reportsByCategoryByMonth(req, res, next) {
  const { _id } = req.user;
  const { type } = req.params;
  console.log("req.params", req.params);
 
  if(!type ){
    return next((BadRequest("Bad Request")));
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
          },
        },
        {
          $group: {
              _id: {
              $dateToString: { format: "%Y-%m", date: '$date' },
            },
          },
        },
        {
          $group: {
            _id: "$category",
          },
        },
        {
          $project: {
            id: nanoid(),
            name:"$category",
            sum: { $sum: "$sum" },
        },
      },
    //     {
    //       $project: {
    //         _id: _id.date,                                   
    //           expenses: { 'Products' : {$sum: { $cond: [{ $eq: ['$category', 'Products']}, '$sum',0 ]}},
    //                       'Alcohol' : {$sum: { $cond: [{ $eq: ['$category', 'Alcohol']}, '$sum',0 ]}},
    //                       'Entertainment' : {$sum: { $cond: [{ $eq: ['$category', 'Entertainment']}, '$sum',0 ]}},
    //                       'Health' : {$sum: { $cond: [{ $eq: ['$category', 'Health']}, '$sum',0 ]}},
    //                       'Transport' : {$sum: { $cond: [{ $eq: ['$category', 'Transport']}, '$sum',0 ]}},
    //                       'Housing' : {$sum: { $cond: [{ $eq: ['$category', 'Housing']}, '$sum',0 ]}},
    //                       'Technique' : {$sum: { $cond: [{ $eq: ['$category', 'Technique']}, '$sum',0 ]}},
    //                       'Communal, communication' : {$sum: { $cond: [{ $eq: ['$category', 'Communal, communication']}, '$sum',0 ]}},
    //                       'Sports, hobbies' : {$sum: { $cond: [{ $eq: ['$category', 'Sports, hobbies']}, '$sum',0 ]}},
    //                       'Education' : {$sum: { $cond: [{ $eq: ['$category', 'Education']}, '$sum',0 ]}},
    //                       'Other' : {$sum: { $cond: [{ $eq: ['$category', 'Other']}, '$sum',0 ]}},
    //          },
    //           incomes: {  'Salary': {$sum: { $cond: [{ $eq: ['$category', 'Salary'] }, '$sum', 0 ]}},
    //                       'AddIncome': {$sum: { $cond: [{ $eq: ['$category', 'Add income'] }, '$sum', 0 ]}},
    //         },
    //   },
    // },
        {
          $sort:{sum: 1},
      },
      ]); 
      return res.status(200).json(result);
    } catch (error) {
      return next((BadRequest("Bad Request")))
    }
}

module.exports = { reportsByCategoryByMonth };
