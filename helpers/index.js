const jwt = require("jsonwebtoken");
const { JWT_CODE } = process.env;

function tryCatchWrapper(enpointFn) {
  return async (req, res, next) => {
    try {
      await enpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

function HttpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

const tokensCreate = (userId) => {
  const accessToken = jwt.sign({ id: userId }, JWT_CODE, {
    expiresIn: "1d",
  });
  const refreshToken = jwt.sign({ id: userId }, JWT_CODE, {
    expiresIn: "30d",
  });

  return { accessToken, refreshToken };
};

module.exports = {
  tryCatchWrapper,
  HttpError,
  tokensCreate,
};
