const express = require("express");
const {
  createExpense,
} = require("../../controllers/transactions/createExpense");
const { createIncome } = require("../../controllers/transactions/createIncome");
const {
  deleteTransaction,
} = require("../../controllers/transactions/deleteTransaction");
const {
  getTransactions,
} = require("../../controllers/transactions/getTransactions");
const { tryCatchWrapper } = require("../../helpers/index");
const { validateBody } = require("../../middlewares/validateBody");

const auth = require("../../middlewares/auth");
const {
  addTransactionsSchema,
} = require("../../schema/Joi/transactionsSchema");

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

module.exports = router;
