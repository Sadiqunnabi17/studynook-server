const Room = require("./room.model");

const createRoom = async (data, ownerId) => {
  const room = await Room.create({ ...data, owner: ownerId });
  return room;
};

const getAllRooms = async ({ search, amenities } = {}) => {
  const query = {};

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  if (amenities && amenities.length > 0) {
    query.amenities = { $in: amenities };
  }

  return await Room.find(query)
    .populate("owner", "name email image")
    .sort({ createdAt: -1 });
};

const getLatestRooms = async () => {
  return await Room.find()
    .populate("owner", "name email image")
    .sort({ createdAt: -1 })
    .limit(6);
};

const getRoomById = async (id) => {
  const room = await Room.findById(id).populate("owner", "name email image");
  if (!room) throw new Error("Room not found");
  return room;
};

const updateRoom = async (id, data, userId) => {
  const room = await Room.findById(id);
  if (!room) throw new Error("Room not found");
  if (room.owner.toString() !== userId.toString()) {
    throw new Error("Not authorized to update this room");
  }
  return await Room.findByIdAndUpdate(id, data, { new: true });
};

const deleteRoom = async (id, userId) => {
  const room = await Room.findById(id);
  if (!room) throw new Error("Room not found");
  if (room.owner.toString() !== userId.toString()) {
    throw new Error("Not authorized to delete this room");
  }
  await Room.findByIdAndDelete(id);
  return true;
};

const getMyRooms = async (userId) => {
  return await Room.find({ owner: userId }).sort({ createdAt: -1 });
};

module.exports = {
  createRoom,
  getAllRooms,
  getLatestRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  getMyRooms,
};