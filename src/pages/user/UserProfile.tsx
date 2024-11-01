import Loading from "@/components/Loading/Loading";
import useCurrentUserData from "@/hoooks/useCurrentData";

const UserProfile = () => {
  const { currentUserInfo, isUserLoading } = useCurrentUserData();

  console.log(currentUserInfo);

  if (isUserLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center -pt-10 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-3xl">
        {/* Header Section */}
        <div className="flex items-center p-6 bg-blue-600 text-white">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white mr-4">
            <img
              src={currentUserInfo?.img}
              alt="User Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{currentUserInfo?.name}</h2>
            <p className="text-lg opacity-90">{currentUserInfo?.email}</p>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">
            Contact Information
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700">Address:</span>
              <span className="text-gray-800">{currentUserInfo?.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Phone:</span>
              <span className="text-gray-800">{currentUserInfo?.phone}</span>
            </div>
          </div>
        </div>

        {/* User Activities Section */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">
            Recent Activities
          </h3>
          <ul className="space-y-3">
            <li className="border-b border-gray-200 pb-2 text-gray-600">
              Logged in from a new device
            </li>
            <li className="border-b border-gray-200 pb-2 text-gray-600">
              Updated profile picture
            </li>
            <li className="border-b border-gray-200 pb-2 text-gray-600">
              Changed password
            </li>
            <li className="text-gray-600">Made a purchase</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
