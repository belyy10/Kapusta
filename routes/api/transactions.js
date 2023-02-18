const express = require("express");
const { tryCatchWrapper } = require("../../helpers/index");
const {
  deleteTransaction,
} = require("../../controllers/transactions.controller");
// const { validateBody } = require("../../middlewares/index");
// const { addTransactionsSchema } = require("../../schemas/transactions");

const router = express.Router();

router.delete("/:id", tryCatchWrapper(deleteTransaction));

module.exports = router;
