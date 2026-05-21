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
  toggleWishlist,
  getWishlist,
} = require("./user.controller");

const protect = require("../../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/auth/google", googleLogin);
router.get("/auth/google/callback", googleCallback, googleSuccess);

router.post("/logout", logout);
router.get("/me", protect, me);
router.patch("/profile", protect, updateProfile);

// Wishlist
router.get("/wishlist", protect, getWishlist);
router.patch("/wishlist/:roomId", protect, toggleWishlist);

module.exports = router;