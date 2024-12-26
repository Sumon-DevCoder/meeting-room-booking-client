import { Link } from "react-router-dom";

const BrandLogo = () => {
  return (
    <Link to="/" className="flex items-center -space-x-2  md:-space-x-3.5">
      <img
        src="https://i.ibb.co.com/Fsrzypg/logo.png"
        alt="Logo"
        className="h-8 w-auto md:h-12"
      />
      <span className="text-[#0D3877] dark:text-[#8CB5F2] font-semibold text-xl whitespace-nowrap">
        Meeting Room
      </span>
    </Link>
  );
};

export default BrandLogo;
