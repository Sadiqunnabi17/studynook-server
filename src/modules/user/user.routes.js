const express = require("express");
const {
  register,
  login,
  googleLogin,
  googleCallback,
  googleSuccess,
  logout,
  me,
  updateProfile,
} = require("./user.controller");

const protect = require("../../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.patch("/profile", protect, updateProfile);

router.get("/auth/google", googleLogin);
router.get("/auth/google/callback", googleCallback, googleSuccess);

router.post("/logout", logout);

router.get("/me", protect, me);

module.exports = router;