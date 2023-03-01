const { Transaction } = require('../../models/transaction');
const { BadRequest } = require("http-errors");
const { HttpError } = require('../../helpers');

const expensesByMonthYear = async (req, res, next) => {
    const { _id } = req.user;
    if (!req.user) return next(HttpError(404, "User not found"));

    try {
        const expensesAgregate = await Transaction.aggregate([
            {
                $match: {
                    owner: _id,
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m", date: '$date' },
},
                                                    
                    expenses: { $sum: { $cond: [{ $eq: ['$type', 'expenses']}, '$sum',0 ]}},
                    incomes: { $sum: { $cond: [{ $eq: ['$type', 'incomes'] }, '$sum', 0 ]}},
               
                }
            },
            {
                $sort:{_id: -1},
            },
        ]);

        return res.status(200).json(expensesAgregate);
    } catch {
        return next((BadRequest("Bad Request")))
    }
}

module.exports = { expensesByMonthYear };
