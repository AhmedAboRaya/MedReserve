const mongoose = require("mongoose");
const express = require("express");
const {
  createReservation,
  deleteReservation,
} = require("../controllers/reservationController");
const router = express.Router();

router.post("/", createReservation);
router.delete("/:reservationId", deleteReservation);

module.exports = router;
