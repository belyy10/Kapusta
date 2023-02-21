const { Users } = require("../../models/modelUser");
const jwt = require("jsonwebtoken");

const getAccessToken = async (req, res, next) => {
  try {
    const user = req.user;
    const { JWT_CODE } = process.env;

    const accessToken = jwt.sign({ id: user.id }, JWT_CODE, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign({ id: user.id }, JWT_CODE, {
      expiresIn: "30d",
    });

    await Users.findByIdAndUpdate(
      { _id: user._id },
      { accessToken: accessToken, refreshToken: refreshToken }
    );

    res.status(200).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAccessToken };
