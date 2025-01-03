/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/Loading/Loading";
import {
  useDeleteSlotByIdMutation,
  useGetSlotsQuery,
} from "@/redux/features/slot/slotApi";
import { TError } from "@/types";
import { TSlots } from "@/types/slots.types";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { format, parseISO } from "date-fns";
import DataNotAvailable from "@/components/DataNotAvailable/DataNotAvailable";

const SlotListTable = () => {
  const { data, isLoading } = useGetSlotsQuery({});
  const [deleteSlotById] = useDeleteSlotByIdMutation();

  const slots = data?.data?.result || [];

  if (isLoading) {
    return <Loading />;
  }

  if (slots.length === 0) {
    return (
      <DataNotAvailable
        message="No available slots exist"
        path="/admin/create-Slots"
        buttonName="Create Slots"
      />
    );
  }

  // Time format function with AM/PM
  const formatTimeWithAMPM = (timeString: string) => {
    try {
      const today = new Date();
      const fullDateTimeString = `${
        today.toISOString().split("T")[0]
      }T${timeString}`;
      const date = new Date(fullDateTimeString);
      return format(date, "hh:mm a");
    } catch (error) {
      return "Invalid time";
    }
  };

  const handleSlotDelete = async (slotId: string, roomName: string) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: `Are you sure you want to delete the slot for room "${roomName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Deleting the slot...");

        try {
          const res = await deleteSlotById(slotId).unwrap();
          if (res && res.message) {
            toast.success(res.message, { id: toastId, duration: 3000 });
          } else {
            toast.error("Something went wrong", {
              id: toastId,
              duration: 3000,
            });
          }
        } catch (err) {
          const serverMsgErr =
            (err as TError)?.data?.message ||
            "An error occurred while deleting the slot. Please try again.";
          toast.error(serverMsgErr, { id: toastId, duration: 3000 });
        }
      }
    });
  };

  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 overflow-x-auto">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Room Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Room No
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Date
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Start Time
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            End Time
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
        {slots.map((slot: TSlots) => (
          <tr key={slot._id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
              {slot.roomName}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {slot.roomNo || "N/A"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {slot.date
                ? format(parseISO(slot.date), "MMMM dd, yyyy")
                : "No date available"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {slot.startTime ? formatTimeWithAMPM(slot.startTime) : "N/A"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {slot.endTime ? formatTimeWithAMPM(slot.endTime) : "N/A"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <Link to={`/admin/slots/${slot._id}`}>
                <button className="btn btn-sm px-3 py-2 text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md hover:bg-gradient-to-l hover:from-purple-500 hover:to-indigo-500">
                  Update
                </button>
              </Link>
              <button
                onClick={() => handleSlotDelete(slot._id, slot.roomName)}
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

export default SlotListTable;
