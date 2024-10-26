import { TRoom } from "@/types/room.types";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

const RoomCard = ({ room }: { room: TRoom }) => {
  const { name, capacity, pricePerSlot, img } = room;

  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden font-roboto transition duration-500 hover:scale-105">
        <img src={img} alt={room.name} className="w-full h-40 object-cover" />
        <div className="p-5">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-600">Capacity: {capacity}</p>
          <p className="text-gray-800 font-bold">${pricePerSlot} per slot</p>
          <div className="mt-4">
            <PrimaryButton path="/meeting-rooms" name="See Details" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
