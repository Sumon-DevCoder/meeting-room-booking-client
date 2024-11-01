import Loading from "@/components/Loading/Loading";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { TError } from "@/types";

import { TUser } from "@/types/booking.types";
import {
  useDeleteUserByIdMutation,
  useGetUsersQuery,
  useUpdateUserByIdMutation,
} from "@/redux/features/user/userApi";

const MakeUser = () => {
  const { data: userData, isLoading: isUserLoading } = useGetUsersQuery({});
  const [updateUserById] = useUpdateUserByIdMutation();
  const [deleteUserById] = useDeleteUserByIdMutation();

  const users = userData?.data?.result || [];

  if (isUserLoading) {
    return <Loading />;
  }

  const handleRoleChange = async (id: string, role: string) => {
    console.log(id, role);
    try {
      const res = await updateUserById({ id, role }).unwrap();
      console.log("res", res);
      toast.success(`Role updated to ${role}`);
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
    <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Email
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Role
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {users.map((user: TUser) => (
          <tr key={user._id}>
            <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <span
                className={
                  user.role === "user" ? "text-green-600" : "text-blue-600"
                }
              >
                {user.role}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {user.role === "user" ? (
                <button
                  onClick={() => handleRoleChange(user?._id, "admin")}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                >
                  Make Admin
                </button>
              ) : (
                <button
                  onClick={() => handleRoleChange(user?._id, "user")}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded"
                >
                  Make User
                </button>
              )}
              <button
                onClick={() => handleDeleteUser(user)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 ml-2 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MakeUser;
