const express = require("express");

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
  expensesByCategoryByMonth,
  incomesByCategoryByMonth,
} = require("../../controllers/agregationTransactions/index.js");

const {
  createTransaction,
} = require("../../controllers/transactions/createTransaction");

const router = express.Router();

router.delete("/:id", tryCatchWrapper(deleteTransaction));

router.post(
  "/expenses",
  auth,
  validateBody(addTransactionsExpensesSchema, {
    context: { route: "expenses" },
  }),
  createTransaction
);

router.post(
  "/incomes",
  auth,
  validateBody(addTransactionsIncomesSchema, { context: { route: "incomes" } }),
  createTransaction
);
router.get("/", auth, getTransactions);

router.get("/expensesByMonthYear", auth, expensesByMonthYear);
router.get("/incomesByMonthYear", auth, incomesByMonthYear);
router.get("/expensesByCategoryByMonth", auth, expensesByCategoryByMonth);
router.get("/incomesByCategoryByMonth", auth, incomesByCategoryByMonth);

module.exports = router;
