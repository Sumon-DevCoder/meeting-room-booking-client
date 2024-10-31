/* eslint-disable @typescript-eslint/no-unused-vars */
import { authApi } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link } from "react-router-dom";
import { TError } from "@/types";
import { motion } from "framer-motion"; // Import Framer Motion

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [login] = authApi.useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      // Call the login mutation
      const res = await login(userInfo).unwrap();

      // redirect path
      const from = location.state?.from?.pathname || "/";

      if (res) {
        const user = verifyToken(res?.token) as TUser; // set user in store
        const BearerToken = `Bearer ${res?.token}`;

        dispatch(setUser({ user: user, token: BearerToken })); // set token in store

        // success
        toast.success("Login Successful", { id: toastId, duration: 3000 });
        navigate(from, { replace: true });
      }
    } catch (err) {
      const serverMsgErr =
        (err as TError)?.data?.message || "Something went wrong";

      if (serverMsgErr) {
        return toast.error(serverMsgErr, {
          id: toastId,
          duration: 3000,
        });
      } else if (err) {
        return toast.error("Something went wrong", {
          id: toastId,
          duration: 2000,
        });
      }
    }
  };

  return (
    <div className="mx-auto">
      <div className="flex justify-center px-6 py-12">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex justify-center">
          <motion.div
            className="w-full lg:w-7/12 shadow-xl bg-gray-100 dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none"
            initial={{ opacity: 0, y: -20 }} // Initial state
            animate={{ opacity: 1, y: 0 }} // Animate to this state
            exit={{ opacity: 0, y: 20 }} // Exit state
            transition={{ duration: 0.5 }} // Duration of the animation
          >
            <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
              Login to Your Account
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="px-8 pt-6 pb-8 mb-4 bg-gray-100 dark:bg-gray-800 rounded"
            >
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm ml-2 mt-1">
                    {errors.email.message as string}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)} // Toggle the state
                    className="absolute top-2 right-0 flex items-center px-3 text-gray-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <HiEyeOff className="text-xl" />
                    ) : (
                      <HiEye className="text-xl" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm ml-2 mt-1">
                    {errors.password.message as string}
                  </p>
                )}
              </div>

              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-semibold text-white bg-blue-500 hover:bg-blue-700 rounded-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Login
                </button>
              </div>

              <div className="text-center">
                <p className="inline-block text-md text-black dark:text-blue-500 align-baseline">
                  Don't have an account?{" "}
                  <Link
                    className="font-semibold text-indigo-500 underline"
                    to={"/register"} // Link to your registration page
                  >
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
