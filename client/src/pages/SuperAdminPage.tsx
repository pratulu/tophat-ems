import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EMS_CLIENT from "../api";
import { Table } from "../components";
//import { usersColumns } from "../constants";
import { addUsers, newUsers } from "../slices/app/UserSlice";

import { useForm } from "react-hook-form";
const SuperAdminPage = () => {
  const dispatch = useDispatch();
  const fetchAllEmployees = async () => {
    const response = await EMS_CLIENT.get("all-users");
    console.log("RESPONSE: ", response.data);
    dispatch(addUsers(response.data));
  };
  const data = useSelector((state: any) => state.users);
  console.log("DATA FETCHED FROM STORE: ", data);

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: "",
      password: "",
      role: "",
    },
  });

  const onSubmit = async (data: any) => {
    const responses = await EMS_CLIENT.post("add-user", data);
    console.log(responses.data);
    console.log("FORM DATA", data);
    dispatch(newUsers({ data }));
  };
  return (
    <div>
      <div>
        <label htmlFor="my-modal-6" className="btn">
          Add User
        </label>

        <input type="checkbox" id="my-modal-6" className="modal-toggle" />

        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <div>
              <button className="btn btn-circle btn-outline  ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="form-control">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label>UserId</label>
                  <input
                    {...register("userId", { required: true })}
                    placeholder="userId"
                    className="input input-bordered m-1"
                  />
                </div>

                <div className="m-2">
                  <label>Password</label>
                  <input
                    {...register("password", { minLength: 8 })}
                    placeholder="Password"
                    className="input input-bordered m-1"
                  />
                </div>

                <div className="input-group m-2">
                  <label>role</label>
                  <select
                    {...register("role")}
                    className="select select-bordered m-1"
                  >
                    <option value="">Select...</option>
                    <option value="dev">dev</option>
                    <option value="hr">hr</option>
                  </select>
                </div>

                <input type="submit" className="m-2" />
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="w-screen h-screen">
        <h1 className="text-center py-5 text-3xl">Employee Dashboard</h1>
        {/* <Table columns={usersColumns} data={data} /> */}
      </div>
    </div>
  );
};
export default SuperAdminPage;
