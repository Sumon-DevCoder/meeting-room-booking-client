import { Link } from "react-router-dom";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

type DataNotAvailableProps = {
  message: string;
  path: string;
  buttonName: string;
};

const DataNotAvailable = ({
  message,
  path,
  buttonName,
}: DataNotAvailableProps) => {
  return (
    <div className="flex justify-center items-center flex-col gap-2 h-full pt-10 px-10 md:px-0 ">
      <p className="text-center font-semibold text-xl border-2 pb-5">
        {message}
      </p>
      <Link to={path}>
        <PrimaryButton name={buttonName} path={path} />
      </Link>
    </div>
  );
};

export default DataNotAvailable;
