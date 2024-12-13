import Loading from "@/components/Loading/Loading";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import RoomCard from "@/components/RoomCard/RoomCard";
import { useGetRoomsQuery } from "@/redux/features/room/roomApi";
import { TRoom } from "@/types/room.types";

const FeaturedRooms = () => {
  const { data, isLoading } = useGetRoomsQuery({});

  if (isLoading) {
    return <Loading />;
  }

  const { data: rooms } = data || [];

  return (
    <div className="py-8 bg-slate-100 dark:bg-slate-900  m-a">
      <h2 className="text-2xl md:text-3xl font-bold  text-center  text-gray-900 dark:text-white">
        Featured Rooms
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-10 space-y-5 md:space-y-0 px-12  lg:px-20">
        {rooms?.result?.length ? (
          rooms.result
            .slice(0, 4)
            ?.map?.((room: TRoom) => <RoomCard key={room?._id} room={room} />)
        ) : (
          <div className="col-span-1 md:col-span-4 flex justify-center items-center h-10">
            <p className="text-center text-gray-600 dark:text-gray-300 font-semibold text-lg">
              No rooms available at the moment. Please check back later.
            </p>
          </div>
        )}
      </div>
      {rooms?.result?.length && (
        <div className="flex justify-center mb-10">
          <PrimaryButton name="See More" path="/meeting-rooms" />
        </div>
      )}
    </div>
  );
};

export default FeaturedRooms;
