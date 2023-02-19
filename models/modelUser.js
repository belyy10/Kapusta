const mongoose = require("mongoose");
const { userSchema } = require("../schema/mongooseSchema/userSchema");

const Users = mongoose.model("user", userSchema);

module.exports = { Users };
