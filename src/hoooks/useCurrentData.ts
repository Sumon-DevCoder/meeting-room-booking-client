/* eslint-disable @typescript-eslint/no-explicit-any */
import CheckUserInfo from "@/components/CheckUserRole/CheckUserInfo";
import { useGetUsersQuery } from "@/redux/features/user/userApi";
import { TUser } from "@/types/booking.types";

const useCurrentUserData = () => {
  const { user } = CheckUserInfo();
  const { data: usersData, isLoading: isUserLoading } = useGetUsersQuery({});
  const users = usersData?.data?.result || [];

  const currentUserInfo = user
    ? users.find((u: TUser) => u.email === user.email)
    : null;

  return { currentUserInfo, isUserLoading };
};

export default useCurrentUserData;
