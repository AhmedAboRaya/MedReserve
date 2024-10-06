const Doctor = require('../models/Doctor');
const User = require('../models/User');
const Room = require('../models/Room');
const Reservation = require('../models/Reservation');
const moment = require('moment'); 

exports.createReservation = async (req, res) => {
  const { doctorId, patientId, day, date, roomId } = req.body;

  if (!doctorId || !patientId || !date || !roomId || !day)
    return res.status(400).json({ msg: "All fields are required" });

  try {
    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ msg: "Doctor not found" });

    // Validate doctor's available days
    const daysOfDoc = getDays(doctor.availability);
    const dayExists = daysOfDoc.find(d => d === day);
    if (!dayExists) return res.status(400).json({ msg: "Invalid day" });

    // Check if patient exists
    const patient = await User.findById(patientId);
    if (!patient) return res.status(404).json({ msg: "Patient not found" });

    // Check if patient is blocked
    if (patient.blocked) return res.status(400).json({ msg: "Patient is blocked" });

    // Check if room exists
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ msg: "Room not found" });

    // Check if the doctor already has a reservation on this date
    const existingReservation = await Reservation.findOne({ doctorId, patientId, date, roomId });
    if (existingReservation)
      return res.status(400).json({ msg: "A reservation already exists for this doctor at this time slot" });

    // Validate the reservation date
    const currentDate = new Date();
    const reservationDate = new Date(date);
    if (reservationDate < currentDate)
      return res.status(400).json({ msg: "Invalid date" });

    // Validate that the day of the reservation date matches the provided day
    const dayOfWeekMap = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const reservationDayOfWeek = dayOfWeekMap[reservationDate.getDay()];

    if (reservationDayOfWeek !== day.toLowerCase())
      return res.status(400).json({ msg: "Selected day does not match the reservation date" });

    // Check the doctor's availability for the specified day
    const availabilityForDay = doctor.availability.find(a => a.day === day);
    if (!availabilityForDay)
      return res.status(400).json({ msg: "Doctor is not available on the selected day" });

    // Calculate total available time for the day (in minutes)
    const totalAvailableTime = calculateTotalTime(availabilityForDay.start, availabilityForDay.end);

    // Check how many reservations already exist for the doctor on this date
    const reservationsForDay = await Reservation.countDocuments({ doctorId, date });

    // Calculate remaining time and check if another reservation can be made
    const usedTime = reservationsForDay * doctor.avg_checkup_time; 
    const remainingTime = totalAvailableTime - usedTime; 

    if (remainingTime < doctor.avg_checkup_time)
      return res.status(400).json({ msg: "No available time slots for this doctor on the selected day" });

    // Save the reservation
    const newReservation = new Reservation({
      doctorId,
      patientId,
      date,
      roomId,
      day,
      timeSlot: getNextTimeSlot(availabilityForDay.start, reservationsForDay, doctor.avg_checkup_time),
      number: reservationsForDay +1
    });
    await newReservation.save();

    // Respond with the success message
    res.status(201).json({ msg: "Reservation saved successfully", reservation: newReservation });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

// Helper function to calculate total time in minutes between start and end times
function calculateTotalTime(start, end) {
  const startTime = moment(start, "HH:mm");
  const endTime = moment(end, "HH:mm");
  return endTime.diff(startTime, 'minutes');
}

// Helper function to generate the next time slot based on the number of reservations
function getNextTimeSlot(start, reservationsForDay, avgCheckupTime) {
  const startTime = moment(start, "HH:mm");
  return startTime.add(reservationsForDay * avgCheckupTime, 'minutes').format("HH:mm");
}

// Helper function to get the doctor's available days
function getDays(availability) {
  return availability.map(obj => obj.day);
}


// delete reservation
exports.deleteReservation = async (req, res) => {
  const { reservationId } = req.params;

  if (!reservationId) return res.status(400).json({ msg: "Reservation ID is required" });

  try {
    // Find the reservation
    const selectesReservation = await Reservation.findById(reservationId);
    if (!selectesReservation) return res.status(404).json({ msg: "Reservation not found" });

    // Retrieve the doctor's ID from the reservation
    const doctorId = selectesReservation.doctorId;

    // Find the doctor associated with this reservation
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ msg: "Doctor not found" });

    // Extract day and duration (checkup time) from the reservation and doctor's info
    const day = selectesReservation.day; 
    const duration = doctor.avg_checkup_time;

    // Update the doctor's available time for the day after deleting the reservation
    await Doctor.findOneAndUpdate(
      { _id: doctorId, "availability.day": day }, 
      { $inc: { "availability.$.time": duration } },
      { new: true } 
    );
    
    // Delete the reservation
    await Reservation.findByIdAndDelete(reservationId);

    res.json({ msg: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};
