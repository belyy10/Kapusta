const express = require("express");
const { tryCatchWrapper } = require("../../helpers/index");
const {
  deleteTransaction,
  //   getAllExpenses,
  createExpense,
  createIncome,
  getTransactions,
} = require("../../controllers/transactions.controller");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.delete("/:id", tryCatchWrapper(deleteTransaction));

router.post("/expenses", auth, createExpense);
router.post("/incomes", auth, createIncome);
router.get("/", auth, getTransactions);

module.exports = router;
