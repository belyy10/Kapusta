const { Users } = require("../../models/modelUser");
const { registerUserSchema } = require("../../middlewares/validation");
const { BadRequest, Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const { email: srvc } = require("../../services");

const { BASE_URL } = process.env;

async function register(req, res, next) {
  const { email, password } = req.body;

  try {
    const { error } = registerUserSchema.validate(req.body);
    if (error) {
      return next(BadRequest(error.message));
    }

    const salt = await bcrypt.genSalt();
    const hasedPwd = await bcrypt.hash(password, salt);

    const verificationToken = nanoid();
    const savedUser = await Users.create({
      email,
      password: hasedPwd,
      verificationToken,
    });

    const mail = {
      to: email,
      subject: "Confirm email",
      html: `<a target="_blanc" href='${BASE_URL}/users/verify/${verificationToken}'><b>Welcome to Kapu$ta!</b> <br> You have just registered! Please, confirm your email if you want to use Kapu$ta</a>`,
    };
    await srvc.sendEmail(mail);

    if (!savedUser.verify) {
      next(BadRequest("Please confirm your email"));
    }

    res.status(201).json({
      user: {
        email: savedUser.email,
        password: hasedPwd,
        balance: savedUser.balance,
      },
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      return next(Conflict("Email in use"));
    }
    throw error;
  }
}

module.exports = register;
