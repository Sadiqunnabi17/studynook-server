const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const { registerUser, loginUser, googleAuth, getMe } = require("./user.service");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const register = asyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;
  const data = await registerUser({ name, email, password, image });
  ApiResponse.success(res, data, "Registration successful! Please login.", 201);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const data = await loginUser({ email, password });
  res.cookie("token", data.token, cookieOptions);
  ApiResponse.success(res, { user: data.user }, "Login successful");
});

const googleLogin = asyncHandler(async (req, res) => {
  const { name, email, image } = req.body;
  const data = await googleAuth({ name, email, image });
  res.cookie("token", data.token, cookieOptions);
  ApiResponse.success(res, { user: data.user }, "Google login successful");
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  ApiResponse.success(res, {}, "Logged out successfully");
});

const me = asyncHandler(async (req, res) => {
  const data = await getMe(req.user._id);
  ApiResponse.success(res, data, "User fetched successfully");
});

module.exports = { register, login, googleLogin, logout, me };