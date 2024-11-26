import { currentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";

const useCurrentUserInfo = () => {
  const { email, role } = useAppSelector(currentUser) || {};
  return { email, role };
};

export default useCurrentUserInfo;
