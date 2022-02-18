const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/user/:id", userCtrl.userid);

module.exports = router;
