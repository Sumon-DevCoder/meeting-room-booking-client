/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/Loading/Loading";
import { useGetRoomsQuery } from "@/redux/features/room/roomApi";
import { TRoom } from "@/types/room.types";
import { useState } from "react";
import CreateSlots from "./CreateSlots";

const SelectRoomSlots = () => {
  const { data, isLoading } = useGetRoomsQuery({});
  const [isTableVisible, setIsTableVisible] = useState(true);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  if (isLoading) {
    return <Loading />;
  }

  const rooms = data?.data?.result || [];

  const handleCreateSlotClick = (id: string) => {
    setSelectedRoomId(id);
    setIsTableVisible(false);
  };

  return (
    <div className="p-4">
      {isTableVisible && ( // Only render this div if isTableVisible is true
        <>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 overflow-x-auto">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Room Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Room Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Room No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Floor No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Price per Slot
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
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
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {room.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {room.roomNo}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {room.floorNo}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {room.capacity}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      ${room.pricePerSlot}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleCreateSlotClick(room?._id as string)}
                      className="btn border-none btn-sm px-3 py-2 text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md hover:bg-gradient-to-l hover:from-purple-500 hover:to-indigo-500"
                    >
                      Create Slots
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {!isTableVisible && (
        <CreateSlots selectedRoomId={selectedRoomId as string} />
      )}
    </div>
  );
};

export default SelectRoomSlots;
