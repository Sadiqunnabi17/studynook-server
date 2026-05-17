const express = require("express");
const {
  addRoom,
  getRooms,
  getLatest,
  getRoom,
  editRoom,
  removeRoom,
  myRooms,
} = require("./room.controller");
const protect = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get("/", getRooms);
router.get("/latest", getLatest);
router.get("/my-rooms", protect, myRooms);
router.get("/:id", getRoom);
router.post("/", protect, addRoom);
router.put("/:id", protect, editRoom);
router.delete("/:id", protect, removeRoom);

module.exports = router;