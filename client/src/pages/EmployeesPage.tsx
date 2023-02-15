import { createColumnHelper } from "@tanstack/react-table";
import { startCase } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import EMS_CLIENT from "../api";
import { Table } from "../components";
import { IAttendance, IEmployees } from "../interfaces";
import { addEmployees } from "../slices/app/EmployeeSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Close } from "../assets";

const columnHelper = createColumnHelper<IEmployees>();
const EmployeesPage = () => {
  // TODO: fetch associatedHrId from token and pass instead of static string value
  const columns = [
    columnHelper.accessor("firstName", {
      cell: (info) => info.getValue(),
      header: "First Name",
    }),
    columnHelper.accessor("lastName", {
      cell: (info) => info.getValue(),
      header: "Last Name",
    }),
    columnHelper.accessor("department", {
      cell: (info) => info.getValue(),
      header: "Department",
    }),
    columnHelper.accessor("designation", {
      cell: (info) => info.getValue(),
      header: "Department",
    }),
    columnHelper.accessor("dateOfBirth", {
      cell: (info) => info.getValue(),
      header: "Date of Birth",
    }),
    columnHelper.accessor("dateOfJoining", {
      cell: (info) => info.getValue(),
      header: "Date of Joining",
    }),
    columnHelper.accessor("dateOfReleiving", {
      cell: (info) => (info.getValue() ? info.getValue() : "no entry"),
      header: "Date of Releiving",
    }),
    columnHelper.accessor("documents", {
      cell: (info) =>
        // VALUE SHOULD BE ARRAY IN FUTURE
        info.getValue() ? info.getValue() : "no documents submitted",
      header: "Documents",
    }),
    columnHelper.accessor("experience", {
      cell: (info) => info.getValue(),
      header: "Experience",
    }),
    columnHelper.accessor("officialEmail", {
      cell: (info) => info.getValue(),
      header: "Official Mail",
    }),
    columnHelper.accessor("personalEmail", {
      cell: (info) => info.getValue(),
      header: "Personal Email",
    }),
    columnHelper.accessor("primaryAddress", {
      cell: (info) => info.getValue(),
      header: "Primary Address",
    }),
    columnHelper.accessor("secondaryAddress", {
      cell: (info) => info.getValue(),
      header: "Secondary Address",
    }),
    columnHelper.accessor("primaryContactNumber", {
      cell: (info) => info.getValue(),
      header: "Primary Contact Number",
    }),
    columnHelper.accessor("secondaryContactNumber", {
      cell: (info) => info.getValue(),
      header: "Secondary Contact Number",
    }),
    columnHelper.accessor("role", {
      cell: (info) => info.getValue(),
      header: "Role",
    }),

    columnHelper.display({
      header: "Attendance",
      cell: (props) => (
        <button
          onClick={() => handleAttendance(props.row.original._id)}
          className="btn btn-accent btn-sm"
        >
          Mark Attendance
        </button>
      ),
    }),

    columnHelper.display({
      header: "Edit",
      cell: (props) => (
        <button
          onClick={() => handleEdit(props.row.original)}
          className="btn btn-success btn-sm"
        >
          Edit
        </button>
      ),
    }),
    columnHelper.display({
      header: "Delete",
      cell: (props) => (
        <button
          onClick={() => handleDelete(props.row.original)}
          className="btn btn-error btn-sm"
        >
          Delete
        </button>
      ),
    }),
  ];

  const schema = yup.object({
    _id: yup.string(),
    firstName: yup.string().required("first name is required"),
    lastName: yup.string().required("last name is required"),
    primaryContactNumber: yup
      .string()
      .required("contact number is required")
      .min(10, "enter valid contact number"),
    secondaryContactNumber: yup
      .string()
      .required("secondary contact is required")
      .min(10, "enter valid contact number"),
    primaryAddress: yup
      .string()
      .required("primary address is required")
      .max(250, "cannot exceed 250 characters"),
    secondaryAddress: yup
      .string()
      .required("secondary address is required")
      .max(250, "cannot exceed 250 characters"),
    officialEmail: yup
      .string()
      .email("enter valid email")
      .required("email is required"),
    personalEmail: yup
      .string()
      .email("enter valid email")
      .required("personal email is required"),
    dateOfBirth: yup.string().required("date of birth is required"),
    designation: yup.string().required("designation is required"),
    department: yup.string().required("department is required"),
    experience: yup.string().required("experience is required"),
    dateOfJoining: yup.string().required("date of joining is required"),
    role: yup.string().required("role is required"),
    permissions: yup.string().required("permissions are required"),
    associatedUserId: yup.string(),
  });

  type FormData = yup.InferType<typeof schema>;
  const dispatch = useDispatch();
  const addEmployeeModalRef = useRef<HTMLInputElement>(null);
  const editEmployeeModalRef = useRef<HTMLInputElement>(null);
  const deleteEmployeeModalRef = useRef<HTMLInputElement>(null);
  const attendanceEmployeeModalRef = useRef<HTMLInputElement>(null);
  const [idToDelete, setIdToDelete] = useState<string>("");
  const [attendanceId, setAttendanceId] = useState("");
  const [attendanceObject, setAttendanceObject] = useState<IAttendance>();

  const getFormKeys = () =>
    Object.keys(data.length > 0 && data[0]).slice(1, 18);

  const handleEdit = (row: any) => {
    handleClose(editEmployeeModalRef);
    reset(row);
    console.log("row", row, "Modal ref:", addEmployeeModalRef.current);
  };

  const handleDelete = (row: any) => {
    handleClose(deleteEmployeeModalRef);
    setIdToDelete(row._id);
  };

  const handleClose = (modalRef: any) => {
    if (modalRef.current) {
      modalRef.current.checked = !modalRef.current.checked;
      console.log("Checkbox is checked:", modalRef.current.checked);
      reset({});
    }
  };

  const handleAttendance = (employeeId: string) => {
    setAttendanceId(employeeId);
    console.log("EMPLOYEE ID FOR ATTENDANCE: ", employeeId);
    handleClose(attendanceEmployeeModalRef);
  };
  const handleAttendanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttendanceObject((prevState: any) => {
      return { ...prevState, [e.target?.name]: e.target.value };
    });
    console.log(attendanceObject);
  };

  const handleAttendanceSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const response = await EMS_CLIENT.post(`mark-attendance/${attendanceId}`, {
      employeeId: attendanceId,
      ...attendanceObject,
    });
    console.log("MARK ATTENDANCE RESPONSE: ", response.data);
    handleClose(attendanceEmployeeModalRef);
  };

  const fetchAllEmployees = async () => {
    const response = await EMS_CLIENT.get("all-employees");
    dispatch(addEmployees(response.data.employeesList));
  };
  const data = useSelector((state: any) => state.employees);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onAddSubmit = async (data: FormData) => {
    const response = await EMS_CLIENT.post("add-employee", data);
    alert(response.data);
    if (addEmployeeModalRef.current) {
      addEmployeeModalRef.current.checked =
        !addEmployeeModalRef.current.checked;
      console.log("Checkbox is checked:", addEmployeeModalRef.current.checked);
    }
  };
  const onEditSubmit = async (data: FormData) => {
    const response = await EMS_CLIENT.put(`edit-employee/${data._id}`, data);
    console.log(response.data);
    handleClose(editEmployeeModalRef);
  };
  const onDeleteSubmit = async () => {
    const response = await EMS_CLIENT.delete(`delete-employee/${idToDelete}`);
    handleClose(deleteEmployeeModalRef);
    console.log(response.data);
  };

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  return (
    <div className="w-screen h-screen">
      <h1 className="text-center py-5 text-3xl">Employee Dashboard</h1>
      <div className="flex justify-end py-4 mx-14">
        {/* TODO: ADD SEARCH INPUT */}

        <button
          onClick={() => handleClose(addEmployeeModalRef)}
          className="btn btn-info"
        >
          Add Employee
        </button>
      </div>
      <div className="overflow-x-auto mx-14">
        <Table tableColumns={columns} tableRows={data} />
      </div>

      {/* ______________________________________________MODALS */}
      {/* add employee modal trigger */}
      <input
        ref={addEmployeeModalRef}
        type="checkbox"
        id="employee-modal_add"
        className="modal-toggle"
      />

      {/* add employee modal */}
      <div className="modal">
        <div className="modal-box">
          <div className="flex w-full justify-between">
            <h3 className="font-bold text-2xl ">Add Employee</h3>
            <span onClick={() => handleClose(addEmployeeModalRef)}>
              <Close className="h-6 w-6 cursor-pointer text-base-content" />
            </span>
          </div>
          {/* ADD EMPLOYEE FORM */}
          <form
            className="py-4 flex flex-col gap-4"
            onSubmit={handleSubmit(onAddSubmit)}
          >
            {getFormKeys().map((formInput) => (
              <div key={formInput} className="form-control">
                <input
                  {...register(formInput)}
                  name={formInput}
                  placeholder={startCase(formInput)}
                  className="input input-primary"
                  type="text"
                />
                <p className="text-rose-500 pt-4">
                  {errors[formInput]?.message}
                </p>
              </div>
            ))}
            <button type="submit" className="btn">
              add
            </button>
          </form>
        </div>
      </div>

      {/* edit employee modal trigger */}
      <input
        ref={editEmployeeModalRef}
        type="checkbox"
        id="employee-modal_edit"
        className="modal-toggle"
      />
      {/* edit employee modal */}
      <div className="modal">
        <div className="modal-box">
          <div className="flex w-full justify-between">
            <h3 className="font-bold text-2xl ">Edit Employee</h3>
            <span onClick={() => handleClose(editEmployeeModalRef)}>
              <Close className="h-6 w-6 cursor-pointer text-base-content" />
            </span>
          </div>
          {/* EDIT EMPLOYEE FORM */}
          <form
            className="py-4 flex flex-col gap-4"
            onSubmit={handleSubmit(onEditSubmit)}
          >
            {getFormKeys().map((formInput) => (
              <div key={formInput} className="form-control">
                <input
                  {...register(formInput)}
                  name={formInput}
                  placeholder={startCase(formInput)}
                  className="input input-primary"
                  type="text"
                />
                <p className="text-rose-500 pt-4">
                  {errors[formInput]?.message}
                </p>
              </div>
            ))}
            <button type="submit" className="btn">
              add
            </button>
          </form>
        </div>
      </div>

      {/* delete employee modal trigger */}
      <input
        ref={deleteEmployeeModalRef}
        type="checkbox"
        id="employee-modal_delete"
        className="modal-toggle"
      />

      {/* delete employee modal */}
      <div className="modal">
        <div className="modal-box">
          <div className="flex w-full justify-between">
            <h3 className="font-bold text-2xl ">Delete Employee</h3>
            <span onClick={() => handleClose(deleteEmployeeModalRef)}>
              <Close className="h-6 w-6 cursor-pointer text-base-content" />
            </span>
          </div>
          {/* DELETE EMPLOYEE Button */}
          <div className="flex flex-1 flex-col justify-center gap-5">
            <h2 className="">
              Are you sure you want to delete the selected entry?
            </h2>
            <div className="flex w-full flex-col justify-center gap-4 ">
              <button
                onClick={onDeleteSubmit}
                className="btn btn-outline btn-error"
              >
                Delete
              </button>
              <button
                onClick={() => handleClose(deleteEmployeeModalRef)}
                className="btn btn-outline btn-success"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* attendance modal trigger */}
      <input
        ref={attendanceEmployeeModalRef}
        type="checkbox"
        id="employee-modal_attendance"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <div className="flex w-full justify-between">
            <h3 className="font-bold text-2xl ">Mark Attendance</h3>
            <span onClick={() => handleClose(attendanceEmployeeModalRef)}>
              <Close className="h-6 w-6 cursor-pointer text-base-content" />
            </span>
          </div>
          {/* DELETE EMPLOYEE Button */}
          <div className="flex flex-1 flex-col justify-center gap-5">
            <h2 className="">Mark attendance of </h2>

            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => handleAttendanceSubmit(e)}
            >
              <div className="form-control">
                <input
                  onChange={(e) => handleAttendanceChange(e)}
                  className="input input-primary"
                  type="date"
                  name="date"
                />
              </div>

              <div className="form-control">
                <select
                  onChange={(e) => handleAttendanceChange(e)}
                  className="select select-primary"
                  name="status"
                  id="status"
                >
                  <option value="select attendance status" defaultChecked>
                    Select Attendance Status
                  </option>
                  <option value="present">Present</option>
                  <option value="abscent">Abscent</option>
                  <option value="halfDay">Half Day</option>
                </select>
              </div>
              <div className="form-control">
                <textarea
                  onChange={(e) => handleAttendanceChange(e)}
                  className="textarea textarea-bordered"
                  name="notes"
                  id="notes"
                  placeholder="Enter note if any"
                ></textarea>
              </div>
              <div className="flex w-full flex-col justify-center gap-4 ">
                <button type="submit" className="btn btn-outline btn-warning">
                  Mark Attendance
                </button>
                <button
                  onClick={() => handleClose(attendanceEmployeeModalRef)}
                  className="btn btn-outline btn-success"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesPage;
