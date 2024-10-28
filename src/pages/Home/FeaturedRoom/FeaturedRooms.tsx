import Loading from "@/components/Loading/Loading";
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
    <div className="border-2 bg-slate-100  max-w-7xl m-auto rounded-md shadow-xl mb-10">
      <h2 className="text-3xl font-bold mb-8 text-center mt-10 ">
        Featured Rooms
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-10 px-20">
        {rooms?.result?.length ? (
          rooms.result.map((room: TRoom) => (
            <RoomCard key={room?._id} room={room} />
          ))
        ) : (
          <div className="col-span-1 md:col-span-4 flex justify-center items-center h-10">
            <p className="text-center text-gray-600 font-semibold text-lg">
              No rooms available at the moment. Please check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedRooms;
