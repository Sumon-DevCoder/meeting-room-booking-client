import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

type TButton = {
  path: string;
  name: string;
};

const PrimaryButton = ({ path, name }: TButton) => {
  return (
    <div>
      <Link
        to={path}
        className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1 text-gray-200 animate-bounce font-medium hvr-grow  py-1 px-2 md:py-1.5 md:px-3  rounded transition duration-300 "
      >
        {name}
        <FaArrowRightLong />
      </Link>
    </div>
  );
};

export default PrimaryButton;
