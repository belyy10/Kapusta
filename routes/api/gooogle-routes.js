const express = require("express");
const router = express.Router();
const { users: ctrl } = require("../../controllers");

router.get("/google", ctrl.googleAuth);
router.get("/google-redirect", ctrl.googleRedirect);

module.exports = router;
