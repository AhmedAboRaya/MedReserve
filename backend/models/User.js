const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: [6, "password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["patient", "doctor", "admin", "manager"],
      default: "patient",
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    absences_counter: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

// Hash password before saving to the database
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
