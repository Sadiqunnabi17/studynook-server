const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const passport = require("passport");
const { registerUser, loginUser, getMe } = require("./user.service");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // ← true in production
  sameSite: "lax", 
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const register = asyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;
  const data = await registerUser({ name, email, password, image });
  return ApiResponse.success(res, data, "Registration successful! Please login.", 201);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const data = await loginUser({ email, password });
  res.cookie("token", data.token, cookieOptions);
  return ApiResponse.success(res, { user: data.user, token: data.token }, "Login successful");
});

const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const googleCallback = passport.authenticate("google", {
  failureRedirect: "http://localhost:3000/login",
  session: false,
});

const googleSuccess = asyncHandler(async (req, res) => {
  const { token } = req.user;
  res.cookie("token", token, cookieOptions);
  return res.redirect("http://localhost:3000/");
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", cookieOptions);
  return ApiResponse.success(res, {}, "Logged out successfully");
});

const me = asyncHandler(async (req, res) => {
  const data = await getMe(req.user._id);
  return ApiResponse.success(res, data, "User fetched successfully");
});

module.exports = {
  register,
  login,
  googleLogin,
  googleCallback,
  googleSuccess,
  logout,
  me,
};