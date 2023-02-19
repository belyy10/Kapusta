const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { Users } = require("../models/modelUser");

async function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");

  try {
    if (type !== "Bearer") {
      return next(Unauthorized("Token type is not valid"));
    }

    if (!token) {
      return next(Unauthorized("No token provided"));
    }

    jwt.verify(token, process.env.JWT_CODE, (err, decoded) => {
      if (err) {
        err = {
          name: "TokenExpiredError",
          message: "jwt expired",
        };
        return res.status(401).send(err);
      }
    });

    const { id } = jwt.verify(token, process.env.JWT_CODE);
    const user = await Users.findById(id);

    if (!user || !user.accessToken) {
      return next(Unauthorized("Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return next(Unauthorized("Not authorized"));
    }
    console.warn(`Error: ${error}`);
  }
}

module.exports = auth;
