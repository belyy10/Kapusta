const { Users } = require("../../models/modelUser");

const logout = async (req, res, next) => {
  try {
    const user = req.user;

    await Users.findByIdAndUpdate({ _id: user._id }, { token: null });

    res.status(201).json({ message: "You are log out" });
  } catch (error) {
    next(error);
  }
};

module.exports = { logout };
