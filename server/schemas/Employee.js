const mongoose = require("mongoose");

// required false for testing
const EmployeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    primaryContactNumber: {
      type: String,

      unique: true,
    },
    secondaryContactNumber: {
      type: String,

      unique: true,
    },
    primaryAddress: {
      type: String,

      unique: true,
    },
    secondaryAddress: {
      type: String,
    },
    officialEmail: {
      type: String,

      unique: true,
    },
    personalEmail: {
      type: String,

      unique: true,
    },
    dateOfBirth: {
      type: String,
    },
    designation: {
      type: String,
    },
    department: {
      type: String,
    },
    experience: {
      type: String,
    },
    dateOfJoining: {
      type: String,
    },
    dateOfReleiving: {
      type: String,
    },
    documents: {
      type: String,
    },
    role: {
      type: String,
    },
    permissions: {
      type: String,
    },
    associatedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
