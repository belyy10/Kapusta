const express = require("express");
const router = express.Router();
const { users: ctrl } = require("../../controllers");
const { email: srvc } = require("../../services");
const auth = require('../../middlewares')

router.post("/register", ctrl.register);

router.get("/verify/:verificationToken", srvc.verifyEmail);
router.post("/verify", srvc.verifyRepeated);

router.post("/login", ctrl.login);
router.post("/logout", auth, ctrl.logout);

module.exports = router;
