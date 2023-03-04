const { Users } = require("../../models/modelUser");
const { BadRequest } = require("http-errors");

const updateBalance = async (req, res, next) => {
  try {
    const { _id } = req.user._id;
    const { balance } = req.body;

    if (balance) {
      const updateUser = await Users.findByIdAndUpdate(
        _id,
        { balance },
        { new: true }
      );

      res.json({
        status: "success",
        code: 201,
        user: {
          email: updateUser.email,
          balance: updateUser.balance,
        },
      });
    } else {
      return next(BadRequest("Wrong input or missing required field"));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = updateBalance;
