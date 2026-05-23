const jwt = require("jsonwebtoken");
const User = require("../modules/user/user.model");

console.log("AUTH MIDDLEWARE LOADED");

const protect = async (req, res, next) => {
  try {
    
    console.log("COOKIES:", req.cookies);       
    console.log("TOKEN:", req.cookies?.token);
    
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED:", decoded); 
    
    req.user = await User.findById(decoded.userId).select("-password");
    console.log("USER:", req.user); 
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = protect;