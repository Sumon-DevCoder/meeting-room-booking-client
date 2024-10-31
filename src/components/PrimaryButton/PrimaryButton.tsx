import { Link } from "react-router-dom";
import "hover.css/css/hover-min.css";

type TButton = {
  path: string;
  name: string;
};

const PrimaryButton = ({ path, name }: TButton) => {
  return (
    <div>
      <Link
        to={path}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold hvr-grow py-2 px-4 rounded transition duration-300"
      >
        {name}
      </Link>
    </div>
  );
};

export default PrimaryButton;
