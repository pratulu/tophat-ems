require("dotenv").config();
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const loginRoute = require("./routes/login");
const userRoute = require("./routes/user");
const employeeRoute = require("./routes/employee");
const candidateRoute = require("./routes/candidate");
const attendanceRoute = require("./routes/attendance");
// Connect to MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log(`ERROR OCCURED: ${err}`));

// Create express app
const app = express();

// * to avoid cors errors in front end
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Use helmet for security
app.use(helmet());
// cross origin resourse sharing
app.use(cors());
// Parse JSON request body
app.use(express.json());

// routes
app.use("/api/auth", loginRoute);
app.use("/api", userRoute);
app.use("/api", employeeRoute);
app.use("/api", candidateRoute);
app.use("/api", attendanceRoute);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SERVER STARTED ON PORT: ${PORT}`);
});
