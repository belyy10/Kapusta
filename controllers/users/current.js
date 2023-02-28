const current = async (req, res, next) => {
  try {
    const user = req.user;

    res
      .status(200)
      .json({ user: { email: user.email, balance: user.balance } });
  } catch (error) {
    next(error);
  }
};

module.exports = { current };
