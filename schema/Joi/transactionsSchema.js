const Joi = require("joi");

const addTransactionsSchema = Joi.object({
  category: Joi.string().required(),
  description: Joi.string().required(),
  sum: Joi.number().required(),
  type: Joi.string().valid("expenses", "incomes").required(),
});

module.exports = {
  addTransactionsSchema,
};
