const Joi = require("joi");

const addTransactionsIncomesSchema = Joi.object({
  category: Joi.string().required(),
  description: Joi.string().required(),
  sum: Joi.number().required(),
  type: Joi.string().valid("incomes").required(),
  day: Joi.number().integer().max(31).min(1).required(),
  month: Joi.number().integer().max(12).min(1).required(),
  year: Joi.number().integer().max(2023).min(2020).required(),
});

const addTransactionsExpensesSchema = Joi.object({
  category: Joi.string().required(),
  description: Joi.string().required(),
  sum: Joi.number().required(),
  type: Joi.string().valid("expenses").required(),
  day: Joi.number().integer().max(31).min(1).required(),
  month: Joi.number().integer().max(12).min(1).required(),
  year: Joi.number().integer().max(2023).min(2020).required(),
});
module.exports = {
  addTransactionsIncomesSchema,
  addTransactionsExpensesSchema,
};
