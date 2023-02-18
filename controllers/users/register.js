// const { Users } = require("../../models/modelUser");
// // const { registerUserSchema } = require("../../middlewares/validation");
// // const { BadRequest, Conflict } = require("http-errors");
// const bcrypt = require("bcrypt");

async function register(req, res, next) {
  //   const { email, password } = req.body;
  //   const salt = await bcrypt.genSalt();
  //   const hasedPwd = await bcrypt.hash(password, salt);
  //   try {
  //     const { error } = registerUserSchema.validate(req.body);
  //     if (error) {
  //       return next(BadRequest("Missing required field"));
  //     }
  //     const savedUser = await Users.create({ email, password: hasedPwd });
  //     res.status(201).json({ user: savedUser });
  //   } catch (error) {
  //     if (error.message.includes("E11000 duplicate key error")) {
  //       return next(Conflict("Email in use"));
  //     }
  //     throw error;
  //   }
}

module.exports = register;
