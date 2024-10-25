import { Link } from "react-router-dom";
import notFoundImg from "../../../assets/not-found.jpg";

const NotFound = () => {
  return (
    // <div
    //   style={{ backgroundImage: `url(${notFoundImg})` }}
    //   className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-black opacity-50 bg-cover bg-center"
    // >
    //   <div className="absolute inset-0 bg-black opacity-50"></div>
    //   <div className="relative">
    //     <h1 className="text-7xl font-bold">404</h1>
    //     <h2 className="mt-4 text-3xl font-medium">Page Not Found</h2>
    //     <p className="mt-2 font-oswald text-2xl">
    //       Oops! The page you're looking for doesn't exist.
    //     </p>
    //     <div className="mt-6">
    //       <Link
    //         to="/"
    //         className="bg-transparent border border-white text-black py-2 px-4 rounded mr-4"
    //       >
    //         Home
    //       </Link>
    //       <Link
    //         to="/login"
    //         className="bg-transparent border border-white text-black py-2 px-4 rounded"
    //       >
    //         Login
    //       </Link>
    //     </div>
    //   </div>
    // </div>

    <section
      className="relative  h-[100vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${notFoundImg})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative flex flex-col items-center justify-center h-full text-white text-center p-4">
        <h2 className="mt-4 text-3xl md:text-7xl font-medium">
          Page Not Found
        </h2>
        <p className="text-lg  md:text-2xl mb-2 py-4 font-oswald tracking-wide">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to={"/"}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
