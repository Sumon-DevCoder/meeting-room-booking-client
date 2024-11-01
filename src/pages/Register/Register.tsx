import { authApi } from "@/redux/features/auth/authApi";
import { TError } from "@/types";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { motion } from "framer-motion";
import axios from "axios"; // Ensure axios is installed

const Register = () => {
  const navigate = useNavigate();
  const [signup, { isLoading }] = authApi.useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [userImg, setUserImg] = useState<File | null>(null); // State for user image

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Processing...");

    // Upload the image to ImgBB if it exists
    let imageUrl = "";
    if (userImg) {
      const formData = new FormData();
      formData.append("image", userImg);

      try {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${"9b72c2e7f55726fd9a28bfb8bfedc08b"}`, // Replace with your ImgBB API key
          formData
        );
        imageUrl = response.data.data.url; // Get the image URL
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        return toast.error("Image upload failed", {
          id: toastId,
          duration: 2000,
        });
      }
    }

    // userInfo object
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: "user",
      address: data.address,
      img: imageUrl, // Include image URL
    };

    try {
      // Call the signup mutation
      const response = await signup(userInfo).unwrap();

      // Check if the signup was successful
      if (response) {
        toast.success("Registration Successful, Please Login", {
          id: toastId,
          duration: 4000,
        });
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      const serverMsgErr =
        (err as TError)?.data?.message ||
        "Something went wrong. Please try again!";

      if (serverMsgErr === "Invalid ID") {
        return toast.error("Phone number already registered!", {
          id: toastId,
          duration: 2000,
        });
      }

      if (serverMsgErr) {
        return toast.error(serverMsgErr, {
          id: toastId,
          duration: 2000,
        });
      } else {
        return toast.error("Something went wrong", {
          id: toastId,
          duration: 2000,
        });
      }
    }
  };

  return (
    <div>
      <div className="mx-auto">
        <motion.div
          className="flex justify-center px-6 py-5"
          initial={{ opacity: 0, y: 20 }} // Start slightly below and transparent
          animate={{ opacity: 1, y: 0 }} // Animate to original position and full opacity
          transition={{ duration: 0.5 }} // Duration of the animation
        >
          <div className="w-full xl:w-3/4 lg:w-11/12 flex justify-center">
            <motion.div
              className="w-full lg:w-7/12 shadow-xl bg-gray-100 dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none"
              initial={{ scale: 0.95 }} // Scale down slightly at start
              animate={{ scale: 1 }} // Animate to full scale
              transition={{ duration: 0.5 }}
            >
              <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">
                Create an Account!
              </h3>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-8 pt-6 pb-8 mb-4 bg-gray-100 dark:bg-gray-800 rounded"
              >
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="firstName"
                    >
                      Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="firstName"
                      type="text"
                      placeholder="Enter Name"
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 3,
                          message: "Name must be at least 3 characters long",
                        },
                      })}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm ml-2 mt-1">
                        {errors.name.message as string}
                      </p>
                    )}
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="lastName"
                    >
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="lastName"
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
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="address"
                    type="text"
                    placeholder="Enter Address"
                    {...register("address", {
                      required: "Address is required",
                      minLength: {
                        value: 10,
                        message: "Address must be at least 10 characters long",
                      },
                    })}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm ml-2 mt-1">
                      {errors.address.message as string}
                    </p>
                  )}
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="phone"
                    >
                      Phone
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="phone"
                      type="number"
                      placeholder="Enter Number"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^\d{10,15}$/,
                          message:
                            "Phone number must be between 10 and 15 digits",
                        },
                      })}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm ml-2 mt-1">
                        {errors.phone.message as string}
                      </p>
                    )}
                  </div>
                  <div className="md:ml-2 ">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="c_password"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="c_password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        {...register("password", {
                          required: "Password is required",
                          pattern: {
                            value:
                              /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                            message:
                              "Password must be at least 6 characters with uppercase, lowercase, number, and special character",
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
                        )}{" "}
                        {/* Eye icon toggle */}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm ml-2 mt-1">
                        {errors.password.message as string}
                      </p>
                    )}
                  </div>
                </div>

                {/* User Image Upload */}
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    htmlFor="userImg"
                  >
                    Upload Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setUserImg(e.target.files[0]); // Set the file to state
                      }
                    }}
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-6 text-center">
                  <button
                    className={`w-full px-4 py-2 font-semibold text-white ${
                      isLoading
                        ? "bg-gray-400"
                        : "bg-blue-500 hover:bg-blue-700"
                    } rounded-full focus:outline-none focus:shadow-outline`}
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Registering..." : "Register"}
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  {/* <a
                  className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a> */}
                </div>
                <div className="text-center">
                  <p className="inline-block text-md text-black dark:text-blue-500 align-baseline ">
                    Already have an account?{" "}
                    <Link
                      className="font-semibold text-indigo-500 underline"
                      to={"/login"}
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
