const jwt = require("jsonwebtoken");
const User = require("./user.model");

const generateToken = (id) => {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const registerUser = async ({ name, email, password, image }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const user = await User.create({
    name,
    email,
    password,
    image: image || "",
    provider: "email",
  });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
    },
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new Error("Invalid email or password");
  if (!user.password) throw new Error("Please login with Google");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
    },
  };
};

const googleAuth = async ({ name, email, image }) => {
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      image: image || "",
      provider: "google",
    });
  }

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
    },
  };
};

const getMe = async (userId) => {
  return await User.findById(userId).select("-password");
};

module.exports = { registerUser, loginUser, googleAuth, getMe, generateToken };