
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT:', err.stack);
});

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const errorMiddleware = require("./middlewares/error.middleware");
const userRoutes = require("./modules/user/user.routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => res.json({ message: "🚀 API is running" }));
app.use("/api/users", userRoutes);

// Error handler
app.use(errorMiddleware);

// Start
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});