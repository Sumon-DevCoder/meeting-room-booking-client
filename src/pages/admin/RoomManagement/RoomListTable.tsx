/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/Loading/Loading";
import {
  useDeleteRoomByIdMutation,
  useGetRoomsQuery,
} from "@/redux/features/room/roomApi";
import { TError } from "@/types";
import { TRoom } from "@/types/room.types";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Swal from "sweetalert2";

const RoomListTable = () => {
  const { data, isLoading } = useGetRoomsQuery({});
  const [deleteRoom] = useDeleteRoomByIdMutation();

  // Display loading spinner if data is loading
  if (isLoading) {
    return <Loading />;
  }

  const rooms = data?.data?.result || [];

  const handleRoomDelete = async (roomId: string, roomName: string) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: `Are you sure you want to delete the room "${roomName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting the room...");

        try {
          const res = await deleteRoom(roomId).unwrap();

          if (res && res.message) {
            toast.success(res.message, { id: toastId, duration: 3000 });
          } else {
            toast.error("Unexpected response received.", {
              id: toastId,
              duration: 3000,
            });
          }
        } catch (err) {
          const serverMsgErr =
            (err as TError)?.data?.message ||
            "An error occurred while deleting the room. Please try again.";

          toast.error(serverMsgErr, {
            id: toastId,
            duration: 3000,
          });
        }
      }
    });
  };

  return (
    <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Room Image
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Room Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Room No.
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Floor No.
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Capacity
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Price per Slot
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {rooms.map((room: TRoom) => (
          <tr key={room._id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <img
                className="h-10 w-10 rounded"
                src={room.img || "/default-room-image.jpg"}
                alt={room.name || "Room Image"}
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">
                {room.name}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{room.roomNo}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{room.floorNo}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{room.capacity}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">${room.pricePerSlot}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <Link to={`/admin/rooms/${room?._id}`}>
                <button className="btn btn-sm px-3 py-2 text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md hover:bg-gradient-to-l hover:from-purple-500 hover:to-indigo-500">
                  Update
                </button>
              </Link>
              <button
                onClick={() =>
                  handleRoomDelete(room._id as string, room.name as string)
                }
                className="btn btn-sm ml-2 px-3 py-2 text-white bg-gradient-to-r from-red-500 to-red-700 rounded-md hover:bg-gradient-to-l hover:from-red-700 hover:to-red-500"
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

export default RoomListTable;
