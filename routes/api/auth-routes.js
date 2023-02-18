const express = require("express");
const router = express.Router();
const { users: ctrl } = require("../../controllers");
const { email: srvc } = require("../../services");

router.post("/register", ctrl.register);

router.get("/verify/:verificationToken", srvc.verifyEmail);
router.post("/verify", srvc.verifyRepeated);

module.exports = router;
