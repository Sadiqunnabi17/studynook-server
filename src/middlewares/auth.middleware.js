const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../modules/user/user.model");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check HTTP-only cookie first
  if (req.cookies?.token) {
    token = req.cookies.token;
  }
  // Fallback to Authorization header
  else if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id).select("-password");

  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "User not found",
    });
  }

  next();
});

module.exports = protect;