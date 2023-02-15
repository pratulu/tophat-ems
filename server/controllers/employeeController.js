const Employees = require("../schemas/Employee");
const Users = require("../schemas/Users");
const { v4: uuidv4 } = require("uuid");
const { utils } = require("../utils");
const bcrypt = require("bcrypt");

// * get list of all employees
const getAllEmployees = async (_req, res) => {
  try {
    const allEmployeesList = await Employees.find({});
    res.status(200).json({
      message: "all employees fetch successfully",
      employeesList: allEmployeesList,
    });
  } catch (error) {
    res.status(400).json({ message: "error occured", error });
  }
};
// * add an employee
const addEmployee = async (req, res) => {
  try {
    const employeePayload = req.body;
    const email = employeePayload.officialEmail;
    const userIdArr = uuidv4().split("-");
    const userId = userIdArr[0] + userIdArr[3];
    const userPassword = utils.createPassword(
      employeePayload.firstName,
      employeePayload.department,
      userIdArr
    );
    const userExists = await Users.findOne({ userId });
    if (userExists)
      return res.json({
        message:
          "user already exists in db with userId, cannot proceed further",
      });
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userPassword, salt);

    const newUser = new Users({
      userId,
      role: employeePayload.role,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    const employeeExists = await Employees.findOne({ officialEmail: email });

    if (employeeExists)
      return res.status(401).json({
        messge: "Employee already exists in db with same email id",
      });
    const newEmployee = new Employees({
      ...employeePayload,
      associatedUserId: savedUser._id,
    });
    const savedEmployee = await newEmployee.save();

    res.status(200).json({
      message:
        "Employee created successfully, User created successfully from Employee.",
      savedEmployee,
      savedUser,
      // ! should be sent only once and then deleted
      userPassword,
    });
  } catch (error) {
    res.status(400).json({ message: "error occured", error });
  }
};

const editEmployee = async (req, res) => {
  try {
    const employeePayload = req.body;
    const employeeId = req.params.id;
    const employeeExists = await Employees.findById(employeeId);
    if (!employeeExists)
      return res.status(401).json({
        message: `Employee doesnot exist with the following ID: ${employeeId} `,
      });
    const editedEmployee = await Employees.findByIdAndUpdate(
      employeeId,
      employeePayload
    );
    res
      .status(200)
      .json({ message: "Employee edited successfully.", editedEmployee });
  } catch (error) {
    res.status(400).json({ message: "An error occured", error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  // TODO: Disable User
  try {
    const employeeId = req.params.id;
    const employeeExists = await Employees.findById(employeeId);
    if (!employeeExists)
      return res.status(400).json({
        message: `Employee doesnot exist with the following ID: ${employeeId}`,
      });
    const deletedEmployee = await Employees.findByIdAndDelete(employeeId);
    res
      .status(200)
      .json({ message: "Employee deleted successfully.", deletedEmployee });
  } catch (error) {
    res.status(400).json({ message: "An error occured", error: error.message });
  }
};

module.exports = {
  employeeController: {
    getAllEmployees,
    addEmployee,
    editEmployee,
    deleteEmployee,
  },
};
