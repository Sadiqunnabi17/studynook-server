const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const { createBooking, getMyBookings, cancelBooking } = require("./booking.service");

const bookRoom = asyncHandler(async (req, res) => {
  const { roomId, date, startTime, endTime, totalCost, specialNote } = req.body;
  const data = await createBooking({
    roomId,
    userId: req.user._id,
    date,
    startTime,
    endTime,
    totalCost,
    specialNote,
  });
  ApiResponse.success(res, data, "Room booked successfully!", 201);
});

const myBookings = asyncHandler(async (req, res) => {
  const data = await getMyBookings(req.user._id);
  ApiResponse.success(res, data, "Bookings fetched successfully");
});

const cancel = asyncHandler(async (req, res) => {
  const data = await cancelBooking(req.params.id, req.user._id);
  ApiResponse.success(res, data, "Booking cancelled");
});

module.exports = { bookRoom, myBookings, cancel };