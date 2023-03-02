const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");
const { Users } = require("../models/modelUser");

const googleUserLogin = async (email) => {
  const user = await Users.findOne({ email });
  if (!user) {
    await User.create({
      email,
      password: nanoid(),
      balance: null,
      verify: true,
      verificationToken: null,
    });
  }
  const storedUser = await Users.findOne({ email });
  const token = jwt.sign({ id: storedUser._id }, process.env.JWT_SECRET, {
    expiresIn: "10h",
  });
  const googleAuthorizedUser = await Users.findByIdAndUpdate(
    storedUser._id,
    { token },
    { new: true }
  );
  return googleAuthorizedUser;
};

module.exports = { googleUserLogin };
