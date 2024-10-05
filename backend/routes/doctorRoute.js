const mongoose = require("mongoose");
const express = require("express");
const {
  createNewDoctor,
  deleteDoctorById,
  getAllAppointmentsByDoctorId,
  getAllDoctors,
  getDoctorById,
  scheduleAppointment,
  updateDoctorById,
} = require("../controllers/doctorController.js");
const { check } = require("express-validator");
const router = express.Router();

// Create a new doctor
router.post('/create',createNewDoctor);

// Delete a doctor by id
router.delete('/:doctorId',deleteDoctorById);

// Get all appointments for a doctor by id
router.get('/appointments/:doctorId', getAllAppointmentsByDoctorId);

// Get all doctors
router.get('/', getAllDoctors);

// Schedule an appointment
router.post("/schedule", scheduleAppointment);

// Update a doctor by id
router.put("/update/:doctorId", updateDoctorById);

// find doctor using identifier
router.get("/:doctorId", getDoctorById);

module.exports = router;