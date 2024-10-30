/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetUsersQuery } from "@/redux/features/user/userApi";
import CheckUserInfo from "../CheckUserRole/CheckUserInfo";
import Loading from "../Loading/Loading";

const CureentUserData = () => {
  const { user } = CheckUserInfo();
  const { data: usersData, isLoading: isUserLoading } = useGetUsersQuery({});
  const users = usersData?.data?.result || [];

  if (isUserLoading) {
    return <Loading />;
  }

  const currentUserInfo = user
    ? users?.find((u: { email: any }) => u.email === user.email)
    : null;

  console.log(currentUserInfo);

  return currentUserInfo;
};

export default CureentUserData;
