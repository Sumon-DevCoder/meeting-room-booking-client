import { currentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";

const CheckUserInfo = () => {
  const user = useAppSelector(currentUser);

  console.log(user);

  let isAdmin = false;
  let isVerifiedUser = false;

  if (user) {
    isAdmin = user?.role === "admin";
    isVerifiedUser = user?.role === "user";
  }

  return { isAdmin, isVerifiedUser, user };
};

export default CheckUserInfo;
