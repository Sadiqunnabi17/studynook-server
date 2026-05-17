const jwt = require("jsonwebtoken");
const User = require("./user.model");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = generateToken(user._id);

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};

const getMe = async (userId) => {
  return await User.findById(userId);
};

module.exports = { registerUser, loginUser, getMe };