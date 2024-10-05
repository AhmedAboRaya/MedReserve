const mongoose = require("mongoose");
const express = require("express");
const {
  addRoom,
  deleteRoom,
  updateRoom,
  allRooms,
} = require("../controllers/roomController");
const router = express.Router();

router.post("/", addRoom);
router.delete("/:roomId", deleteRoom);
router.put("/:roomId", updateRoom);
router.get("/", allRooms);

module.exports = router;
