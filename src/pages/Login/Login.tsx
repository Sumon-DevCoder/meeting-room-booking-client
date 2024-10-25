/* eslint-disable @typescript-eslint/no-unused-vars */
import { authApi } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { data, error }] = authApi.useLoginMutation();
  const { register, handleSubmit } = useForm();

  // console.log();

  const onSubmit = async (data: FieldValues) => {
    // logging in
    const toastId = toast.loading("Logging in");

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res?.data?.accessToken) as TUser; // set user in store

      dispatch(setUser({ user: user, token: res?.data?.accessToken })); // set token in store

      // logged in
      toast.success("Logged In", { id: toastId, duration: 2000 });

      navigate(`/${user?.role}/dashboard`);
    } catch (err) {
      const errorMsg = error?.data?.message || "Something went wrong";
      toast.error(errorMsg, { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email")}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password")}
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
