const express = require("express");
const { tryCatchWrapper } = require("../../helpers/index");
const {
  deleteTransaction,getAllExpenses, createExpenses, createIncome, expensesByMonthYear, incomesByMonthYear
} = require("../../controllers/transactions.controller");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.delete("/:id", tryCatchWrapper(deleteTransaction));
// routes for expneses and income
router.get('/', tryCatchWrapper(auth), getAllExpenses);
router.post('/', auth, createExpenses);
router.patch('/', auth, createIncome);

router.get('/expensesByMonthYear', auth, expensesByMonthYear);
router.get('/incomesByMonthYear', auth, incomesByMonthYear);

module.exports = router;
