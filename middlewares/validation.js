const Joi = require("joi");

const registerUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(6),
});

const verifyUserSchema = Joi.object({
  email: Joi.string().required(),
});

module.exports = {
  registerUserSchema,
  verifyUserSchema,
};
