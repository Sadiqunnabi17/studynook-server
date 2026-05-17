const express = require("express");
const { bookRoom, myBookings, cancel } = require("./booking.controller");
const protect = require("../../middlewares/auth.middleware");

const router = express.Router();

router.post("/", protect, bookRoom);
router.get("/my-bookings", protect, myBookings);
router.patch("/:id/cancel", protect, cancel);

module.exports = router;