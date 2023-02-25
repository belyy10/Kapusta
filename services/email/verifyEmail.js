const { Users } = require("../../models/modelUser");
const { NotFound } = require("http-errors");
const { tokensCreate } = require("../../helpers");
const { FRONTEND_URL } = process.env;

async function verifyEmail(req, res, next) {
  const { verificationToken } = req.params;
  const user = await Users.findOne({ verificationToken });

  if (!user) {
    return next(NotFound("User not found"));
  }

  const { accessToken, refreshToken } = tokensCreate(user._id);

  await Users.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
    accessToken,
    refreshToken,
  });

  res.redirect(
    `${FRONTEND_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`
  );
}

module.exports = verifyEmail;
