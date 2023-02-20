const register = require("./register");
const { login } = require("./login");
const { logout } = require("./logout");
const { current } = require("./current");
const { getAccessToken } = require("./getAccessToken");
const updateBalance = require("./updateBalance");

module.exports = {
  register,
  login,
  logout,
  current,
  getAccessToken,
  updateBalance,
};
