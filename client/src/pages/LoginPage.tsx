import { AuthLayout } from "../layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FC, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { PATHS } from "../router/paths";
import axios from "axios";
import { BE_CONNECTION_STRING } from "../constants";
import { useDispatch } from "react-redux";
import { setToken } from "../slices/app/AppSlice";
//import SuperAdminPage from "./SuperAdminPage";
type Props = {};
interface loginPayload {
  userId: string;
  password: string;
}

// login page
const LoginPage: FC = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [togglePassword, setTogglePassword] = useState(false);
  const schema = yup.object({
    userId: yup.string().required("user id is required"),
    password: yup
      .string()
      .min(6, "minimum of 6 characters mandatory")
      .required("password is required"),
  });
  type FormData = yup.InferType<typeof schema>;

  const handlePasswordToggle = () => {
    setTogglePassword((prevState) => !prevState);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const response = await axios.post(
      `${BE_CONNECTION_STRING}/auth/login`,
      data
    );
    const token = response.data.token;
    dispatch(setToken(token));
    localStorage.setItem("token", token);
    navigate(PATHS.superAdminPage);
  };

  return (
    <AuthLayout>
      <div className=" border-customBlack border-[1px] h-96 py-4  rounded-lg flex flex-col items-center w-full md:w-2/4 lg:w-1/4 shadow-customBlack shadow-md bg-customBlack1">
        <div className="py-4 rounded-t-lg bg-customBlack1 w-full">
          <h1 className="text-2xl md:text-4xl text-customWhite3 text-center font-bold">
            LOGIN
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className=" w-full px-4 py-2">
          <div className="form-control mb-4">
            <label className=" text-customWhite3" htmlFor="user-id">
              User ID
            </label>
            <input
              {...register("userId")}
              className="mt-2 w-full px-2 py-2 rounded-lg bg-customBlack hover:bg-customBlack1 hover:border-[1px] hover:border-customWhite3 focus:bg-customBlack1 focus:border-[1px] focus:border-customWhite3 text-customWhite3 outline-none transition-all ease-in duration-150"
              type="text"
              name="userId"
              id="userId"
              defaultValue={"0115e5609d81"}
            />
            <span className="text-customRed1">{errors.userId?.message}</span>
          </div>
          <div className="form-control mb-4 relative">
            <label
              className="flex justify-between mb-2 text-customWhite3"
              htmlFor="password"
            >
              <span>Password</span>
              <NavLink
                to={PATHS.error}
                className="text-customRed1 text-sm underline underline-offset-2 cursor-pointer hover:text-customRed3"
              >
                Forget Password
              </NavLink>
            </label>
            <input
              {...register("password")}
              className="mt-2 w-full px-2 py-2 rounded-lg bg-customBlack hover:bg-customBlack1 hover:border-[1px] hover:border-customWhite3 focus:bg-customBlack1 focus:border-[1px] focus:border-customWhite3 text-customWhite3 outline-none transition-all ease-in-out duration-75"
              type={!togglePassword ? "password" : "text"}
              name="password"
              id="password"
              defaultValue={"Vis057adev"}
            />
            <div>
              {togglePassword ? (
                <AiOutlineEyeInvisible
                  onClick={handlePasswordToggle}
                  className="absolute text-xl text-customWhite3 right-4 top-[62%] cursor-pointer"
                />
              ) : (
                <AiOutlineEye
                  onClick={handlePasswordToggle}
                  className="absolute text-xl text-customWhite3 right-4 top-[62%] cursor-pointer"
                />
              )}
            </div>
            {/* <span className="text-customRed1">{errors.password?.message}</span> */}
          </div>
          <div className="mt-2 w-full">
            <button className="mt-2 px-4 py-2 bg-customRed3 rounded-lg w-full text-customWhite4 hover:text-customWhite3 hover:bg-customRed4 transition-all ease-in diration-150">
              Login
            </button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
