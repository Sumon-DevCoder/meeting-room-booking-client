import { authApi } from "@/redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FieldValues, useForm } from "react-hook-form";

const Register = () => {
  const navigate = useNavigate();
  const [signup, { data, error }] = authApi.useSignupMutation();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("logging in");
    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        role: "user",
        address: data.address,
      };

      await signup(userInfo);

      toast.success("Registration Successfully", {
        id: toastId,
        duration: 2000,
      });

      navigate(`/login`);
    } catch (err) {
      toast.error("something went wrong", { id: toastId, duration: 2000 });
      console.log(err);
    }
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="input input-bordered"
                  {...register("name")}
                  required
                />
              </div>
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
                  <span className="label-text">Phone</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter Your Number"
                  className="input input-bordered"
                  {...register("phone")}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Address"
                  className="input input-bordered"
                  {...register("address")}
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
                <button className="btn btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
