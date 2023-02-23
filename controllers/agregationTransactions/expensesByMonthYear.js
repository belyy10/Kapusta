const { Transaction } = require('../../models/transaction');
const { BadRequest} = require("http-errors");
// const moment = require('moment');

const expensesByMonthYear = async (req, res, next) => {
    const { _id } = req.user;
    const { month, year } = req.body;
    console.log(_id);

    if(month && year){
        const expensesAgregate = await Transaction.aggregate([
            {
                $match: {
                    owner: _id,
                    type: 'expenses',
                    year: year,
                    month: month,
                },
            },
            {
                $group: {
                    _id: null,
                    // _id: {
                    //     '$dateToString': {
                    //         'format': "%Y-%m-%d",
                    //         'date': 'date'
                    //     }
                        // year: { moment.get.(date)},
                        // month: '01',
                    // },
                    expenses: { $sum: '$sum' },
                    // month,
                    // year,
                    //   month: {$month: 'date'},
                }
            },
            {
                $project: {  
                _id: 0,
                // day: { $dateToString: { format: '%Y', date: '$date'}},
                expenses: '$expenses'
                    // month: {$month: {date: Date('date')}}
                    // yearMonthDayUTC: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
                    // monthOffset: { $dateToString: { format: '%m', date: '$date' } },
                },
            },
        
        ]);
    console.log('return', expensesAgregate)
        //  return res.status(200).json(dateM);
        return res.status(200).json(expensesAgregate);
    }else{
        return next((BadRequest("Bad Request")))
    }
    
}

module.exports = { expensesByMonthYear };
