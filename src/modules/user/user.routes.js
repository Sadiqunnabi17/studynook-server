const express = require("express");
const { register, login, googleLogin, logout, me } = require("./user.controller");
const protect = require("../../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);
router.post("/logout", logout);
router.get("/me", protect, me);

module.exports = router;