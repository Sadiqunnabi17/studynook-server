const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const { registerUser, loginUser, getMe } = require("./user.service");

const register = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const data = await registerUser({ name, email, password });
    ApiResponse.success(res, data, "User registered successfully", 201);
  } catch (error) {
    next(error);
  }
});

const login = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await loginUser({ email, password });
    ApiResponse.success(res, data, "Login successful");
  } catch (error) {
    next(error);
  }
});

const me = asyncHandler(async (req, res, next) => {
  try {
    const data = await getMe(req.user._id);
    ApiResponse.success(res, data, "User fetched successfully");
  } catch (error) {
    next(error);
  }
});

module.exports = { register, login, me };