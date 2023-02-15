const Attendance = require("../schemas/Attendance");
const Employee = require("../schemas/Employee");
const markAttendance = async (req, res) => {
  try {
    const { employeeId, date, status, notes } = req.body;
    const employeeExists = await Employee.findById(employeeId);
    if (!employeeExists)
      return res
        .status(404)
        .json({ message: "employee doesnot exist with provided userid" });
    const newAttendanceEntry = new Attendance({
      employeeId,
      date,
      status,
      notes,
    });
    const savedAttendanceEntry = await newAttendanceEntry.save();
    res.status(200).json({
      message: "attendance updated successfully",
      savedAttendanceEntry,
    });
  } catch (error) {
    res.status(400).json({ message: "error occured", error: error.message });
  }
};

module.exports = {
  attendanceController: {
    markAttendance,
  },
};
