import { authApi } from "@/redux/features/auth/authApi";
import { FieldValues, useForm } from "react-hook-form";

const Register = () => {
  // import part
  // const navigate = useNavigate();
  const [signup, { data, error }] = authApi.useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // error handling from server
  console.log("server error", error);
  console.log("server data", data);

  const serverErrorMsg = error?.data?.message;

  if (serverErrorMsg) {
    return <p>{serverErrorMsg}</p>;
  }

  // onsubmit part
  const onSubmit = (data: FieldValues) => {
    // // toast
    // toast.loading("logging in", { id: toastId });

    try {
      // userInfo object
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        role: "user",
        address: data.address,
      };

      // validation
      if (userInfo.password.length < 6) {
        // return toast.error("Password must have 6 characters!", {
        //   id: toastId,
        //   duration: 2000,
        // });
      }

      // signup function with redux
      signup(userInfo);

      // toast.success("Registration Successfully", {
      //   id: toastId,
      //   duration: 2000,
      // });

      // navigate(`/login`);
    } catch (err) {
      // toast.error("something went wrong", { id: toastId, duration: 2000 });
      console.log(err);
    }
  };

  return (
    <div>
      <div className="mx-auto">
        <div className="flex justify-center px-6 py-12">
          {/* Row */}
          <div className="w-full xl:w-3/4 lg:w-11/12 flex justify-center">
            <div className="w-full lg:w-7/12  shadow-xl bg-gray-100 dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
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
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <span className="text-red-500 ">Name is required</span>
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
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span className="text-red-500 ">Email is required</span>
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
                    {...register("address", { required: true })}
                  />
                  {errors.address && (
                    <span className="text-red-500 ">Address is required</span>
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
                      {...register("phone", { required: true })}
                    />
                    {errors.phone && (
                      <span className="text-red-500 ">Phone is required</span>
                    )}
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                      htmlFor="c_password"
                    >
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="c_password"
                      type="password"
                      placeholder="Enter Password"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <span className="text-red-500 ">
                        Password is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <a
                    className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="text-center">
                  <a
                    className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                    href="./index.html"
                  >
                    Already have an account? Login!
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
