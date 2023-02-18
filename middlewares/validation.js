const Joi = require("joi");

const registerUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(8),
});

const verifyUserSchema = Joi.object({
  email: Joi.string().required(),
});

module.exports = {
  registerUserSchema,
  verifyUserSchema,
};
