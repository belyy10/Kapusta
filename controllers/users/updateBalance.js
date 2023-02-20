const { Users } = require('../../models/modelUser');
const { HttpError } = require("../helpers/index.js");

const updateBalance = async (req, res, next) => {
  try {
    const { _id } = req.user._id;
    const { balance } = req.body;
    const updateUser = await Users.findByIdAndUpdate(
      _id,
      { balance },
      { new: true },
    );
    if (!updateUser) {
      throw new HttpError();
    }
    res.json({
        status: 'success',
        code: 200,
      user: {
        email: updateUser.email,
        balance: updateUser.balance,
      },
    });
  } catch (error) {
    next(error);
  }
  console.log('updateBalance');
};

module.exports = updateBalance;