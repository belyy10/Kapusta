const { Transaction } = require('../../models/transaction');
const { BadRequest} = require("http-errors");
const { HttpError } = require('../../helpers');


const incomesByMonthYear = async (req, res, next) => {
   if (!req.user) return next(HttpError(404, "User not found"));
  const { _id } = req.user;

    try {
        const incomesAgregate = await Transaction.aggregate([
            {
                $match: {
                    owner: _id,
                    type: 'incomes',
                },
            },
            {
                $group: {
                    _id: {$dateToString:{format: "%Y-%m", date: '$date'}},
                    incomes: { $sum: '$sum' },
                }
            },
            {
                $sort:{_id: -1},
            },
        ]);
        return res.status(200).json(incomesAgregate);
    } catch {
        return next((BadRequest("Bad Request")))
    }
}

module.exports = { incomesByMonthYear };

//   if (!req.user) return next(HttpError(404, "User not found"));

//   const { _id } = req.user;
//   const { month, year } = req.body;
//   console.log(_id); 
//   const yearStarts = new Date(`Wed, 01 Jan ${year} 00:00:00 GMT`);
//   const yearEnds = new Date(`Thu, 31 Dec ${year} 00:00:00 GMT`);
    
//   if (month && year) {
//     console.log('month', month);
//     console.log('year', year);
//     const incomesAgregate = await Transaction.aggregate([
//       {
//         $match: {
//           owner: _id,
//           type: 'incomes',
//           dateTransaction: {
//             $gte: yearStarts,
//             $lte: yearEnds,
//           },
//           // year: year,
//           // month: month,
//         },
//       },
//       {
//         $group: {
//           // _id: null,

//           _id: `${year}-${month}`,
//           //     '$dateToString': {
//           //         'format': "%Y-%m-%d",
//           //         'date': 'date'
//           //     }
//           // year: { moment.get.(date)},
                 
//           // },
//           income: { $sum: '$sum' },

//           //   month: {$month: 'date'},
//         }
//       },
//       // }
//       // {
//       //     $addFields: {
//       //         month: '$_id.month',
//       //     },
//       // },
//       // { $unset: '_id', },
//       // { $sort: { month: 1, } },
            

//       {
//         $project: {
//           _id: `${year}-${month}`,
//           income: '$income'
//         },
//       },

//     ]);
  

  

//         return res.status(200).json(incomesAgregate);
//     // }else{
//     //     return next((BadRequest("Bad Request")))
//  }
    
// }

