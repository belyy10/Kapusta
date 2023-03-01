const register = require("./register");
const { login } = require("./login");
const { logout } = require("./logout");
const { current } = require("./current");
const { getAccessToken } = require("./getAccessToken");
const updateBalance = require("./updateBalance");
const { googleAuth } = require("./googleAuth");
const { googleRedirect } = require("./googleRedirect");

module.exports = {
  register,
  login,
  logout,
  current,
  getAccessToken,
  updateBalance,
  googleAuth,
  googleRedirect,
};
