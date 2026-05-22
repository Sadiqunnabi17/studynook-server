const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const passport = require("passport");
const { registerUser, loginUser, getMe } = require("./user.service");
const User = require("./user.model");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const register = asyncHandler(async (req, res) => {
  const { name, email, password, image, studentId, department, academicLevel } = req.body;
  const data = await registerUser({ name, email, password, image, studentId, department, academicLevel });
  return ApiResponse.success(res, data, "Registration successful! Please login.", 201);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const data = await loginUser({ email, password });
  res.cookie("token", data.token, cookieOptions);
  return ApiResponse.success(res, { user: data.user, token: data.token }, "Login successful");
});

const googleLogin = passport.authenticate("google", { scope: ["profile", "email"] });

const googleCallback = passport.authenticate("google", {
  failureRedirect: "http://localhost:3000/login",
  session: false,
});

const googleSuccess = asyncHandler(async (req, res) => {
  console.log("GOOGLE SUCCESS CALLED");
  console.log("REQ USER:", JSON.stringify(req.user));
  const token = req.user?.token;
  const userToken = req.user?.user?.token;
  console.log("TOKEN1:", token, "TOKEN2:", userToken);
  res.cookie("token", token || userToken, cookieOptions);
  return res.redirect(process.env.CLIENT_URL || "http://localhost:3000");
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", cookieOptions);
  return ApiResponse.success(res, {}, "Logged out successfully");
});

const me = asyncHandler(async (req, res) => {
  const data = await getMe(req.user._id);
  return ApiResponse.success(res, data, "User fetched successfully");
});

const updateProfile = asyncHandler(async (req, res) => {
  const { academicLevel, image } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { academicLevel, image },
    { new: true }
  ).select("-password");
  return ApiResponse.success(res, user, "Profile updated successfully");
});

// Toggle wishlist (save/unsave a room)
const toggleWishlist = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  const user = await User.findById(req.user._id);
  const isWishlisted = user.wishlist.includes(roomId);

  if (isWishlisted) {
    user.wishlist = user.wishlist.filter((id) => id.toString() !== roomId);
    await user.save();
    return ApiResponse.success(res, { wishlisted: false }, "Room removed from wishlist");
  } else {
    user.wishlist.push(roomId);
    await user.save();
    return ApiResponse.success(res, { wishlisted: true }, "Room saved to wishlist");
  }
});

// Get wishlist
const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate(
    "wishlist",
    "name image floor capacity hourlyRate amenities bookingCount"
  );
  return ApiResponse.success(res, user.wishlist, "Wishlist fetched successfully");
});

module.exports = {
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
};