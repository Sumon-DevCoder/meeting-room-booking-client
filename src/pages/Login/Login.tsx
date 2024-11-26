/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { authApi } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link } from "react-router-dom";
import { TError } from "@/types";
import { motion } from "framer-motion";
import { IoArrowBackCircle } from "react-icons/io5";
import useAuth from "@/hoooks/useAuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn, signInWithGoogle } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [login] = authApi.useLoginMutation();
  const [activeRole, setActiveRole] = useState<string | null>("admin");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "mustafiz247@gmail.com",
      password: "Mustafiz247@",
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  // handle default value
  const handleDefaultValueChange = (role: string) => {
    setActiveRole(role);
    const newValues =
      role === "admin"
        ? { email: "mustafiz247@gmail.com", password: "Mustafiz247@" }
        : { email: "sumon2@gmail.com", password: "Sumon2@" };

    reset(newValues);
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      // Call the login mutation
      const res = await login(userInfo).unwrap();

      if (res) {
        const user = verifyToken(res?.token) as TUser; // set user in store
        const BearerToken = `Bearer ${res?.token}`;

        dispatch(setUser({ user: user, token: BearerToken })); // set token in store

        // success
        toast.success("Login Successful", { id: toastId, duration: 3000 });
        // redirect path
        const from =
          location.state?.from?.pathname || `/${user?.role}/dashboard`;
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

  //  signIn with google
  const handleSignWithGoogle = () => {
    signInWithGoogle()
      .then(() => {
        // auto navigate
        navigate(location?.state ? location?.state : "/");

        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error: { message: any }) => setError(error.message));
  };

  return (
    <div className="mx-auto">
      <div className="mx-auto">
        <div className="flex justify-center px-6 py-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex justify-center">
            <div className="pr-5 pt-2 hidden md:block">
              <NavLink
                to="/"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300 flex items-center"
              >
                <IoArrowBackCircle className="mr-2" />
                Back
              </NavLink>
            </div>
            <motion.div
              className="w-full lg:w-7/12 shadow-xl bg-gray-100 dark:bg-gray-800 p-5 rounded-lg lg:rounded-l-none"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
                Login to Your Account
              </h3>

              <div className="text-center space-x-2">
                <button
                  onClick={() => handleDefaultValueChange("admin")}
                  className={`btn btn-sm btn-outline ${
                    activeRole === "admin"
                      ? "btn-active bg-blue-500 text-white dark:text-blue-400"
                      : "text-gray-800 dark:text-white"
                  }`}
                >
                  Admin Credentials
                </button>
                <button
                  onClick={() => handleDefaultValueChange("user")}
                  className={`btn btn-sm btn-outline ${
                    activeRole === "user"
                      ? "btn-active bg-blue-500 text-white dark:text-blue-400"
                      : "text-gray-800 dark:text-white"
                  }`}
                >
                  User Credentials
                </button>
              </div>

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
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-white dark:bg-gray-900"
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
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-white dark:bg-gray-900"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message:
                            "Password must be at least 6 characters long",
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

                <div>
                  <button onClick={handleSignWithGoogle}>Google </button>
                </div>

                <div className="text-center">
                  <p className="inline-block text-md text-black dark:text-blue-500 align-baseline">
                    Don't have an account?{" "}
                    <Link
                      className="font-semibold text-indigo-500 underline"
                      to={"/register"}
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
    </div>
  );
};

export default Login;
function setError(message: any) {
  throw new Error("Function not implemented.");
}
