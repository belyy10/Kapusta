const { Users } = require("../../models/modelUser");
const { NotFound } = require("http-errors");

async function verifyEmail(req, res, next) {
  const { verificationToken } = req.params;
  const user = await Users.findOne({ verificationToken });

  if (!user) {
    return next(NotFound("User not found"));
  }

  await Users.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({ message: "Verification successful" });
}

module.exports = verifyEmail;
