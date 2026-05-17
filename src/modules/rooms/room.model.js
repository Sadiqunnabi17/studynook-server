const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Room name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    floor: {
      type: String,
      required: [true, "Floor is required"],
    },
    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
    },
    hourlyRate: {
      type: Number,
      required: [true, "Hourly rate is required"],
    },
    amenities: {
      type: [String],
      default: [],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookingCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;