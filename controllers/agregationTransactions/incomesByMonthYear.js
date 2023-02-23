const { Transaction } = require('../../models/transaction');
const { BadRequest} = require("http-errors");


const incomesByMonthYear = async (req, res, next) => {
    const { _id } = req.user;
    const { month, year } = req.body;
    console.log(_id);

    if(month && year){
        const incomesAgregate = await Transaction.aggregate([
            {
                $match: {
                    owner: _id,
                    type: 'incomes',
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
                    income: { $sum: '$sum' },
                    // month,
                    // year,
                    //   month: {$month: 'date'},
                }
            },
            {
                $project: {  
                _id: 0,
                // day: { $dateToString: { format: '%Y', date: '$date'}},
                income: '$income'
                    // month: {$month: {date: Date('date')}}
                    // yearMonthDayUTC: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
                    // monthOffset: { $dateToString: { format: '%m', date: '$date' } },
                },
            },
        
        ]);
    // console.log('return', incomesAgregate)
        //  return res.status(200).json(dateM);
        return res.status(200).json(incomesAgregate);
    }else{
        return next((BadRequest("Bad Request")))
    }
    
}

module.exports = { incomesByMonthYear };
