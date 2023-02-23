const { Users } = require("../../models/modelUser");
const { BadRequest, Unauthorized } = require("http-errors");

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
      if (!updateUser) {
        return Unauthorized();
      }
  
      res.json({
        status: "success",
        code: 200,
        user: {
          email: updateUser.email,
          balance: updateUser.balance,
        },
      });
    } else{ 
      return next(BadRequest("Wrong input or missing required field"));
    }

    
  } catch (error) {
    next(error);
  }
};

module.exports = updateBalance;
