const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    enum: ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
  },
  start: {
    type: String,
    required: true,
    match: /^(?:[01]\d|2[0-3]):[0-5]\d$/,
  },
  end: {
    type: String,
    required: true,
    match: /^(?:[01]\d|2[0-3]):[0-5]\d$/,
  },
  time: {
    type: Number,
    required: true
  }
});

const doctorSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, "doctor first name is requested"],
    },
    lname: {
      type: String,
      required: [true, "doctor last name is required"],
    },
    specialization: {
      type: String,
      required: [true, "doctor specialization is required"],
    },
    contact: {
      type: String,
      required: [true, "doctor contact is required"],
    },
    email: {
      type: String,
      required: [true, "doctor email is required"],
      unique: true,
    },
    availability: {
      type: [availabilitySchema],
      required: [true, "doctor availability is required"],
    },
    avg_checkup_time: { // Updated field name
      type: Number,
      required: [true, "doctor average checkup time is required"]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Doctor", doctorSchema);
