const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: { type: String, required: [true, "Email is required"], unique: true, lowercase: true, trim: true },
    password: { type: String, minlength: 6, select: false },
    image: { type: String, default: "" },
    studentId: { type: String, trim: true, default: "" },
    department: { type: String, trim: true, default: "" },
    academicLevel: { type: String, trim: true, default: "" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    provider: { type: String, enum: ["email", "google"], default: "email" },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }], // ← new
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;