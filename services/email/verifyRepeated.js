const { Users } = require("../../models/modelUser");
const { BadRequest } = require("http-errors");
const { verifyUserSchema } = require("../../middlewares/validation");
const { email: srvc } = require("./sendEmail");
const { BASE_URL } = process.env;

async function verifyRepeated(req, res, next) {
  const { email } = req.body;

  const { error } = verifyUserSchema.validate(req.body);
  if (error) {
    return next(BadRequest({ message: "Missing required field email" }));
  }

  const user = await Users.findOne({ email });
  if (user.verificationToken === null) {
    return next(
      BadRequest({ message: "Verification has already been passed" })
    );
  }

  const mail = {
    to: email,
    subject: "Confirm email",
    html: `<a target="_blanc" href='${BASE_URL}/users/verify/${user.verificationToken}'>Confirm email</a>`,
  };
  await srvc.sendEmail(mail);
  res.status(200).json({ message: "Verification email sent" });
}

module.exports = verifyRepeated;
