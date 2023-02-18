// const { Users } = require("../../models/modelUser");

const logout = async (req, res, next) => {
  try {
    const user = req.user;

    console.log(user);

    res.status(201).json({ message: "You are log out" });
  } catch (error) {
    next(error);
  }
};

module.exports = { logout };
