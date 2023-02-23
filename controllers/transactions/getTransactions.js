const { Transaction } = require("../../models/transaction");
const { NotFound} = require("http-errors");


async function getTransactions(req, res, next) {
  const userId = req.user._id;
  const { type } = req.query;
  if (type === "incomes" || type === "expenses"){
    const transactions = await Transaction.find({ owner: userId, type: type });
    return res.json({ transactions });
  } else {
    return next(NotFound("NotFound"))
  } 

  
}

module.exports = {
  getTransactions,
};
