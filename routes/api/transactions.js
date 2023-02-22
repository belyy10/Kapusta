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
  addTransactionsSchema,
} = require("../../schema/Joi/transactionsSchema");
const { expensesByMonthYear } = reuqire(
  "../../controllers/agregationTransactions/expensesByMonthYear.js"
);
const { incomesByMonthYear } = reuqire(
  "../../controllers/agregationTransactions/incomesByMonthYear.js"
);

const router = express.Router();

router.delete("/:id", tryCatchWrapper(deleteTransaction));

router.post(
  "/expenses",
  auth,
  validateBody(addTransactionsSchema),
  createExpense
);
router.post(
  "/incomes",
  auth,
  validateBody(addTransactionsSchema),
  createIncome
);
router.get("/", auth, getTransactions);

router.get("/expensesByMonthYear", auth, expensesByMonthYear);
router.get("/incomesByMonthYear", auth, incomesByMonthYear);

module.exports = router;
