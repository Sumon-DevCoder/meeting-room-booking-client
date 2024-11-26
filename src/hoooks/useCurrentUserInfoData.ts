import { useGetUserByEmailQuery } from "@/redux/features/user/userApi";
import useCurrentUserInfo from "./useCurrentUserInfo";

const useCurrentUserInfoData = () => {
  const { email } = useCurrentUserInfo();
  const { data: userData, isLoading: isUserLoading } =
    useGetUserByEmailQuery(email);

  const user = userData?.data || {};

  return { user, isUserLoading };
};

export default useCurrentUserInfoData;
