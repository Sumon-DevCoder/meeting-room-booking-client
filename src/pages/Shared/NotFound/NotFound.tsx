import { Link } from "react-router-dom";
import notFoundImg from "../../../assets/not-found.jpg";

const NotFound = () => {
  return (
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
