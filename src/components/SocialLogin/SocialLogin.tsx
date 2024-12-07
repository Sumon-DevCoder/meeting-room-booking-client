/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useAuth from "@/hoooks/useAuthContext";
import Swal from "sweetalert2";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

const SocialLogin = () => {
  const { signInWithGoogle, signInWithFacebook } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Sign in with Google
  const handleSignWithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result?.user);

        const user = {
          email: result?.user?.email,
          name: result?.user?.displayName,
          img: result?.user?.photoURL,
          role: "user",
        };

        const token = result.user.getIdToken();
        const BearerToken = `Bearer ${token}`;

        dispatch(setUser({ user: user, token: BearerToken }));

        console.log(token);

        // Auto navigate
        navigate("/");

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error: { message: string }) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  // Sign in with Facebook
  const handleSignWithFacebook = () => {
    signInWithFacebook()
      .then((result) => {
        // Auto navigate

        console.log("fb credential", result?.user);
        const user = {
          email: result?.user?.email,
          name: result?.user?.displayName,
          img: result?.user?.photoURL,
          role: "user",
        };

        const token = result.user.getIdToken();
        const BearerToken = `Bearer ${token}`;

        dispatch(setUser({ user: user, token: BearerToken }));

        console.log(token);

        // Auto navigate
        navigate("/");

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error: { message: string }) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="flex space-x-4 justify-center">
      <button
        onClick={handleSignWithGoogle}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md transform transition duration-200 hover:bg-blue-500 hover:scale-105 focus:outline-none"
      >
        <FaGoogle className="text-white text-xl" />
        Google
      </button>

      <button
        onClick={handleSignWithFacebook}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-800 text-white rounded-lg shadow-md transform transition duration-200 hover:bg-blue-700 hover:scale-105 focus:outline-none"
      >
        <FaFacebook className="text-white text-xl" />
        Facebook
      </button>
    </div>
  );
};

export default SocialLogin;
