const Doctor = require('../models/Doctor'); // Corrected the spelling of 'Doctor'
const User = require('../models/User');
const Room = require('../models/Room');
const Reservation = require('../models/Reservation'); // Ensure to import the Reservation model

exports.createReservation = async (req, res) => {
  const { doctorId, patientId, day, date, roomId, timeSlot } = req.body; // Added timeSlot to req.body

  if (!doctorId || !patientId || !date || !roomId || !day || !timeSlot) // Check for all fields
    return res.status(400).json({ msg: "All fields are required" });
    const doctor1 = await Doctor.findById(doctorId);

    const daysOfDoc = getDays(doctor1.availability);
    console.log(daysOfDoc);

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ msg: "Doctor not found" });

    const avg_checkup_time = doctor.avg_checkup_time;

    const daysOfDoc = getDays(doctor.availability);
    const dayExists = daysOfDoc.find(d => d === day);
    if (!dayExists) return res.status(400).json({ msg: "Invalid day" });

    const patient = await User.findById(patientId);
    if (!patient) return res.status(404).json({ msg: "Patient not found" });

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ msg: "Room not found" });

    const existingReservation = await Reservation.findOne({ doctorId, date, timeSlot });
    if (existingReservation) return res.status(400).json({ msg: "A reservation already exists for this doctor at this time slot" });

    // Check if the patient is not blocked
    if (patient.blocked) return res.status(400).json({ msg: "Patient is blocked" });

    // Check if the doctor has exceeded their daily limit
    const doctorReservations = await Reservation.find({ doctorId, date });
    if (doctorReservations.length >= doctor.dailyLimit) return res.status(400).json({ msg: "Doctor has reached their daily limit" });

    const newReservation = new Reservation({ doctorId, patientId, date, timeSlot, roomId });
    await newReservation.save();
    
    res.status(201).json({ msg: "Reservation saved successfully", reservation: newReservation }); // Return the created reservation
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message }); // Optionally include the error message for debugging
  }
};

function getDays(availability) {
    return availability.map(obj => obj.day);
}
