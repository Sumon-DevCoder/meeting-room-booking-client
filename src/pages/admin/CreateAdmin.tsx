import Loading from "@/components/Loading/Loading";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { TError } from "@/types";

import { TUser } from "@/types/booking.types";
import {
  useDeleteUserByIdMutation,
  useGetUsersQuery,
} from "@/redux/features/user/userApi";
import axiosInstance from "@/config/axiosInstance";

const MakeUser = () => {
  const {
    data: userData,
    isLoading: isUserLoading,
    refetch,
  } = useGetUsersQuery({});
  const [deleteUserById] = useDeleteUserByIdMutation();

  const users = userData?.data?.result || [];

  if (isUserLoading) {
    return <Loading />;
  }

  const handleRoleChange = async (id: string, userRole: string) => {
    console.log(id, userRole);
    try {
      const res = await axiosInstance.put(`/users/${id}`, { role: userRole });
      console.log("res", res);
      toast.success(`Role updated to ${userRole}`);
      refetch();
    } catch (error) {
      console.error("Failed to update role:", error);
      const errorMsg =
        (error as TError)?.data?.message ||
        "Failed to update role. Please try again.";
      toast.error(errorMsg);
    }
  };

  // Handle User deletion
  const handleDeleteUser = async (User: TUser) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: `Are you sure you want to delete User "${User.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting User...");

        try {
          const response = await deleteUserById(User._id).unwrap();
          if (response?.message) {
            toast.success(response.message, { id: toastId });
          } else {
            toast.error("Unexpected response received.", { id: toastId });
          }
        } catch (err) {
          const serverErrorMsg =
            (err as TError)?.data?.message ||
            "An error occurred while deleting the User. Please try again.";
          toast.error(serverErrorMsg, { id: toastId });
        }
      }
    });
  };

  return (
    <div className="p-5">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border-2 rounded-lg shadow-lg dark:divide-gray-700 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase dark:text-gray-300">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase dark:text-gray-300">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase dark:text-gray-300">
                Role
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
            {users.map((user: TUser) => (
              <tr
                key={user._id}
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                  <span
                    className={`${
                      user.role === "user" ? "text-green-600" : "text-blue-600"
                    } dark:${
                      user.role === "user" ? "text-green-400" : "text-blue-400"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.role === "user" ? (
                    <button
                      onClick={() => handleRoleChange(user._id, "admin")}
                      className="bg-green-500 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white font-semibold text-sm py-2 px-2 rounded shadow-md"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRoleChange(user._id, "user")}
                      className="bg-yellow-500 hover:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white font-semibold text-sm py-2 px-4 rounded shadow-md"
                    >
                      Make User
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="bg-red-500 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white font-semibold text-sm py-2 px-4 rounded shadow-md ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MakeUser;
