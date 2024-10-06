const { default: mongoose } = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: Date,
      required: true,
    },
    day: {
        type: String,
        enum: ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
    },
    number: {
      type: Number,
      required: true,
    },
    timeSlot: {
      type: String,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
    status: {
        type: String,
        enum: ["approved", "rejected", "absent"],
        default: "approved",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
