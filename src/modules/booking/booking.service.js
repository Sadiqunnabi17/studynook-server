const Booking = require("./booking.model");
const Room = require("../room/room.model");
const User = require("../user/user.model");

const createBooking = async ({ roomId, userId, date, startTime, endTime, totalCost, specialNote }) => {
  // Check conflict
  const conflict = await Booking.findOne({
    room: roomId,
    date: new Date(date),
    status: "confirmed",
    $or: [
      {
        startTime: { $lt: endTime },
        endTime: { $gt: startTime },
      },
    ],
  });

  if (conflict) {
    throw new Error("This time slot is already booked. Please choose another time.");
  }

  const booking = await Booking.create({
    room: roomId,
    user: userId,
    date: new Date(date),
    startTime,
    endTime,
    totalCost,
    specialNote,
  });

  // Increment booking count
  await Room.findByIdAndUpdate(roomId, { $inc: { bookingCount: 1 } });

  // Add booking to user
  await User.findByIdAndUpdate(userId, { $push: { bookings: booking._id } });

  return booking;
};

const getMyBookings = async (userId) => {
  return await Booking.find({ user: userId })
    .populate("room", "name image hourlyRate floor")
    .sort({ createdAt: -1 });
};

const cancelBooking = async (bookingId, userId) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new Error("Booking not found");
  if (booking.user.toString() !== userId.toString()) {
    throw new Error("Not authorized to cancel this booking");
  }
  if (booking.status === "cancelled") {
    throw new Error("Booking already cancelled");
  }

  booking.status = "cancelled";
  await booking.save();

  // Remove from user bookings array
  await User.findByIdAndUpdate(userId, {
    $pull: { bookings: bookingId },
  });

  // Decrement booking count
  await Room.findByIdAndUpdate(booking.room, {
    $inc: { bookingCount: -1 },
  });

  return booking;
};

module.exports = { createBooking, getMyBookings, cancelBooking };