
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT:', err.stack);
});

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const errorMiddleware = require("./middlewares/error.middleware");
const userRoutes = require("./modules/user/user.routes");
const roomRoutes = require("./modules/room/room.routes");
const bookingRoutes = require("./modules/booking/booking.routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get("/", (req, res) => res.json({ message: "StudyNook API is running" }));
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

// Error handler
app.use(errorMiddleware);

// Start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});