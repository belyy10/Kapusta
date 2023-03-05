const express = require("express");
const router = express.Router();
const { users: ctrl } = require("../../controllers");
const { email: srvc } = require("../../services");
const { auth } = require("../../middlewares");

router.post("/register", ctrl.register);

router.get("/verify/:verificationToken", srvc.verifyEmail);
router.post("/verify", srvc.verifyRepeated);

router.post("/login", ctrl.login);
router.post("/logout", auth, ctrl.logout);
router.get("/current", auth, ctrl.current);
router.get("/get-access-token", auth, ctrl.getAccessToken);
router.patch("/balance", auth, ctrl.updateBalance);
router.get("/google", ctrl.googleAuth);
router.get("/google-redirect", ctrl.googleRedirect);

module.exports = router;
