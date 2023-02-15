const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const { attendanceController } = require("../controllers/attendanceController");

const router = express.Router();
router.post("/mark-attendance/:id", attendanceController.markAttendance);

module.exports = router;
