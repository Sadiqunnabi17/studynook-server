require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const errorMiddleware = require("./middlewares/error.middleware");
const userRoutes = require("./modules/user/user.routes");
const roomRoutes = require("./modules/rooms/room.routes");
const bookingRoutes = require("./modules/booking/booking.routes");
const initializePassport = require("./config/passport");

const app = express();
const PORT = process.env.PORT || 5000;
const passport = initializePassport();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());

app.get("/", (req, res) => res.json({ message: "StudyNook API is running" }));
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(errorMiddleware);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});