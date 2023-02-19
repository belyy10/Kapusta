const register = require("./register");
const { login } = require("./login");
const { logout } = require("./logout");
const { current } = require("./current");
const { getAccessToken } = require("./getAccessToken");

module.exports = { register, login, logout, current, getAccessToken };
