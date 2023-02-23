const express = require("express");

const {
  createExpense,
} = require("../../controllers/transactions/createExpense");
const { createIncome } = require("../../controllers/transactions/createIncome");
const {
  deleteTransaction,
} = require("../../controllers/transactions/deleteTransaction");
const auth = require("../../middlewares/auth");

const {
  getTransactions,
} = require("../../controllers/transactions/getTransactions");
const { tryCatchWrapper } = require("../../helpers/index");
const { validateBody } = require("../../middlewares/validateBody");
const {
  addTransactionsExpensesSchema,
  addTransactionsIncomesSchema,
} = require("../../schema/Joi/transactionsSchema");
const {
  expensesByMonthYear,
} = require("../../controllers/agregationTransactions/expensesByMonthYear.js");
const {
  incomesByMonthYear,
} = require("../../controllers/agregationTransactions/incomesByMonthYear.js");
const {
  amountOfExpensesByMonth,
  expensesByCategoryByMonth,
  amountOfIncomesByMonth,
  incomesByCategoryByMonth,
} = require("../../controllers/agregationTransactions/index.js");

const router = express.Router();

router.delete("/:id", tryCatchWrapper(deleteTransaction));

router.post(
  "/expenses",
  auth,
  validateBody(addTransactionsExpensesSchema, {
    context: { route: "expenses" },
  }),
  createExpense
);
router.post(
  "/incomes",
  auth,
  validateBody(addTransactionsIncomesSchema, { context: { route: "incomes" } }),
  createIncome
);
router.get("/", auth, getTransactions);

router.get("/expensesByMonthYear", auth, expensesByMonthYear);
router.get("/incomesByMonthYear", auth, incomesByMonthYear);
router.get("/expensesByCategoryByMonth", auth, expensesByCategoryByMonth);
router.get("/incomesByCategoryByMonth", auth, incomesByCategoryByMonth);

module.exports = router;
