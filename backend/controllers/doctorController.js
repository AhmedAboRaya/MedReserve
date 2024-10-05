const Doctor = require("../models/Doctor.js");

// create a new doctor
exports.createNewDoctor = async function (req, res) {
  const {
    fname,
    lname,
    specialization,
    contact,
    email,
    availability,
    avg_checkup_time,
  } = req.body;
  

  try {
    console.log(req.body);
    // validate inputs
    if (!fname || !lname || !specialization || !contact || !email || !availability || !avg_checkup_time) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      return res.status(400).json({ msg: "Invalid email address" });
    }

    if (contact.length !== 11 || isNaN(contact)) {
      return res.status(400).json({ msg: "Invalid contact number" });
    }

    if (availability.length > 7 || availability.length < 1) {
      return res.status(400).json({ msg: "Invalid availability array" });
    }

    let arr = [];
    for (let i = 0; i < availability.length; i++) {
      const { valid, message } = validateAvailability(availability[i]);
      if (!valid) {
        return res.status(400).json({ msg: `Invalid availability element ${i}: ${message}` });
      }

      const start_time = availability[i].start;
      const end_time = availability[i].end;
      const { valid: validDiff, message: messageDiff } = diffHours(start_time, end_time);
      if (!validDiff) {
        return res.status(400).json({ msg: `Invalid availability for element ${i}: ${messageDiff}` });
      }
      const diffTime = messageDiff;

      if (diffTime < avg_checkup_time) {
        return res.status(400).json({
          msg: `Availability for element ${i} is less than checkup time`,
        });
      }

      arr.push({
        day: availability[i].day,
        start: start_time,
        end: end_time,
        time: diffTime,
      });
    }

    // check if doctor already exists
    const doctorExists = await Doctor.findOne({
      fname: fname,
      lname: lname,
      specialization: specialization,
    });
    if (doctorExists) {
      return res.status(400).json({ msg: "Doctor already exists" });
    }

    const doctor = new Doctor({
      fname,
      lname,
      specialization,
      contact,
      email,
      availability: arr,
      avg_checkup_time,
    });

    const savedDoctor = await doctor.save(); // Await the save operation
    return res.status(201).json(savedDoctor); // Use 201 status code
  } catch (error) {
    return res.status(500).json({ msg: "Error creating doctor", error: error.message }); // Change status code to 500 for server errors
  }
};


function validateAvailability(avail) {
  const { day, start, end } = avail;
  const dayPattern =
    /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)$/;
  const timePattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/ ;

  // Check if the day is valid
  if (!dayPattern.test(day)) {
    return { valid: false, message: "Invalid day" };
  }

  // Check if the time is valid
  if (!timePattern.test(start)) {
    return { valid: false, message: "Invalid start time format" };
  }
  if (!timePattern.test(end)) {
    return { valid: false, message: "Invalid end time format" };
  }

  return { valid: true, message: "Valid availability" };
}

function diffHours(start, end) {
  let [startH, startM] = start.split(":").map(Number);
  let [endH, endM] = end.split(":").map(Number);

  if (endH < startH || (endH === startH && endM <= startM)) {
    return { valid: false, message: "End time must be greater than start time" };
  }

  let timeH = endH - startH;
  let timeM = endM - startM;

  if (endM < startM) {
    timeH--;
    timeM += 60; 
  }

  return { valid: true, message: timeH * 60 + timeM }; 
}






exports.getDoctorById = async function (req, res) {
  const { doctorId } = req.params;
  if (!doctorId) return res.status(404).json({ msg: "missing doctor ID" });
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ msg: "doctor not found" });
    return res.json(doctor);
  } catch (error) {
    return res.status(400).json({ msg: "error getting doctor" });
  }
};

exports.updateDoctorById = async function (req, res) {
  const { doctorId } = req.params;
  if (!doctorId) return res.status(404).json({ msg: "Missing doctor ID" });

  const updates = req.body;
  if (!updates || Object.keys(updates).length === 0)
    return res.status(404).json({ msg: "Missing updates" });

  if (updates.availability) {
    // Validate availability array length
    if (updates.availability.length > 7 || updates.availability.length < 1) {
      return res.status(400).json({ msg: "Invalid availability array length" });
    }

    // Validate each availability element
    for (let i = 0; i < updates.availability.length; i++) {
      const { valid, message } = validateAvailability(updates.availability[i]);
      if (!valid) {
        return res
          .status(400)
          .json({ msg: `Invalid availability element ${i}: ${message}` });
      }

      const start_time = updates.availability[i].start;
      const end_time = updates.availability[i].end;

      // Validate that start_time is less than end_time
      if (start_time >= end_time) {
        return res.status(400).json({
          msg: `Invalid availability element ${i}: start time must be earlier than end time`,
        });
      }

      // Calculate the difference in time (in minutes)
      const diffTime = diffHours(start_time, end_time);

      // Validate that the available time is greater than the average checkup time
      if (diffTime < updates.avgaverage_checkup_time) {
        return res.status(400).json({
          msg: `Availability for element ${i} is less than checkup time`,
        });
      }

      // Store the time difference in the availability object
      updates.availability[i].time = diffTime;
    }
  }


  try {
    const doctor = await Doctor.findByIdAndUpdate(doctorId, updates, {
      new: true,
    });
    if (!doctor) return res.status(404).json({ msg: "Doctor not found" });
    return res.json(doctor);
  } catch (error) {
    return res.status(400).json({ msg: "Error updating doctor", error: error.message });
  }
};


exports.getAllDoctors = async function (req, res) {
  try {
    const doctors = await Doctor.find();
    return res.json(doctors);
  } catch (error) {
    return res.status(400).json({ msg: "error getting doctors" });
  }
};

exports.deleteDoctorById = async function (req, res) {
  const { doctorId } = req.params;
  if (!doctorId) return res.status(404).json({ msg: "missing doctor ID" });

  try {
    const doctor = await Doctor.findByIdAndDelete(doctorId);
    if (!doctor) return res.status(404).json({ msg: "doctor not found" });
    return res.json({ msg: "doctor deleted" });
  } catch (error) {
    return res.status(400).json({ msg: "error deleting doctor" });
  }
};

exports.scheduleAppointment = async function (req, res) {};

exports.getAllAppointmentsByDoctorId = async function (req, res) {};

