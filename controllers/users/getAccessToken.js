const { Users } = require("../../models/modelUser");
const jwt = require("jsonwebtoken");

const getAccessToken = async (req, res, next) => {
  try {
    const user = req.user;
    const { JWT_CODE } = process.env;

    const accessToken = jwt.sign({ id: user.id }, JWT_CODE, {
      expiresIn: "1d",
    });

    await Users.findByIdAndUpdate(
      { _id: user._id },
      { accessToken: accessToken }
    );

    res.status(200).json({
      accessToken: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAccessToken };
