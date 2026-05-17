const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const {
  createRoom,
  getAllRooms,
  getLatestRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  getMyRooms,
} = require("./room.service");

const addRoom = asyncHandler(async (req, res) => {
  const data = await createRoom(req.body, req.user._id);
  ApiResponse.success(res, data, "Room added successfully", 201);
});

const getRooms = asyncHandler(async (req, res) => {
  const { search, amenities } = req.query;
  const amenitiesArray = amenities ? amenities.split(",") : [];
  const data = await getAllRooms({ search, amenities: amenitiesArray });
  ApiResponse.success(res, data, "Rooms fetched successfully");
});

const getLatest = asyncHandler(async (req, res) => {
  const data = await getLatestRooms();
  ApiResponse.success(res, data, "Latest rooms fetched successfully");
});

const getRoom = asyncHandler(async (req, res) => {
  const data = await getRoomById(req.params.id);
  ApiResponse.success(res, data, "Room fetched successfully");
});

const editRoom = asyncHandler(async (req, res) => {
  const data = await updateRoom(req.params.id, req.body, req.user._id);
  ApiResponse.success(res, data, "Room updated successfully");
});

const removeRoom = asyncHandler(async (req, res) => {
  await deleteRoom(req.params.id, req.user._id);
  ApiResponse.success(res, {}, "Room deleted successfully");
});

const myRooms = asyncHandler(async (req, res) => {
  const data = await getMyRooms(req.user._id);
  ApiResponse.success(res, data, "My rooms fetched successfully");
});

module.exports = {
  addRoom,
  getRooms,
  getLatest,
  getRoom,
  editRoom,
  removeRoom,
  myRooms,
};