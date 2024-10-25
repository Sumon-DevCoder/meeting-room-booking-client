import RoomCard from "@/components/RoomCard/RoomCard";
import { useGetRoomsQuery } from "@/redux/api/baseApi";
import { TRoom } from "@/types/room.types";

const FeaturedRooms = () => {
  const { data, isLoading } = useGetRoomsQuery({});

  if (isLoading) {
    return <p className="bg-yellow-500 text-2xl font-bold">Loading...</p>;
  }

  const { data: rooms } = data;

  console.log(rooms?.result);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-10 px-20">
        {rooms?.result?.map((room: TRoom) => (
          <RoomCard key={room?._id} room={room} />
        ))}
      </div>
    </>
  );
};

export default FeaturedRooms;
