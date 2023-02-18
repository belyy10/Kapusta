const { Users } = require("../../models/modelUser");
const { loginUserSchema } = require("../../schema/Joi/loginUserSchema");
const { BadRequest, Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  try {
    const { error } = loginUserSchema.validate(req.body);
    const { email, password } = req.body;
    const { JWT_CODE } = process.env;

    if (error) {
      return next(BadRequest("Missing required field"));
    }

    const user = await Users.findOne({ email }).exec();
    const isComparePassword = await bcrypt.compare(password, user.password);

    if (!isComparePassword) {
      return next(Unauthorized("email or passwor is not valid"));
    }

    const token = jwt.sign({ id: user.id }, JWT_CODE, { expiresIn: "7d" });
    await Users.findByIdAndUpdate({ _id: user._id }, { token: token });

    res.status(200).json({ token, user: { email: user.email } });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
