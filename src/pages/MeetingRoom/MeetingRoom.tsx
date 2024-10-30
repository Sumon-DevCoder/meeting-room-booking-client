import { useState } from "react";
import { useGetRoomsQuery } from "@/redux/features/room/roomApi";
import Loading from "@/components/Loading/Loading";
import { TRoom } from "@/types/room.types";
import RoomCard from "@/components/RoomCard/RoomCard";

const MeetingRooms = () => {
  // Import
  const { data, isLoading } = useGetRoomsQuery({});
  const [searchTerm, setSearchTerm] = useState("");
  const [capacityFilter, setCapacityFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // Setup loading
  if (isLoading) {
    return <Loading />;
  }

  const rooms = data?.data?.result || [];

  // Filter, search, and sort logic
  const filteredRooms = () => {
    // Make a shallow copy of rooms to prevent modifying the original array
    let result = [...rooms];

    // Apply search
    if (searchTerm) {
      result = result.filter((room: TRoom) =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply capacity filter
    if (capacityFilter) {
      result = result.filter(
        (room: TRoom) => room.capacity >= parseInt(capacityFilter)
      );
    }

    // Apply price filter
    if (priceFilter) {
      result = result.filter(
        (room: TRoom) => room.pricePerSlot <= parseInt(priceFilter)
      );
    }

    // Apply sort order
    if (sortOrder === "asc") {
      result = result.sort(
        (a: { pricePerSlot: number }, b: { pricePerSlot: number }) =>
          a.pricePerSlot - b.pricePerSlot
      );
    } else if (sortOrder === "desc") {
      result = result.sort(
        (a: { pricePerSlot: number }, b: { pricePerSlot: number }) =>
          b.pricePerSlot - a.pricePerSlot
      );
    }

    return result;
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setCapacityFilter("");
    setPriceFilter("");
    setSortOrder("");
  };

  return (
    <section className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Meeting Rooms</h1>

      {/* Search, Filter, and Sort Options */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <input
          type="text"
          placeholder="Search by room name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md"
        />

        <select
          value={capacityFilter}
          onChange={(e) => setCapacityFilter(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Filter by Capacity</option>
          <option value="5">5+</option>
          <option value="10">10+</option>
          <option value="20">20+</option>
          <option value="30">30+</option>
          <option value="60">60+</option>
        </select>

        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Filter by Price</option>
          <option value="50">Up to $50</option>
          <option value="100">Up to $100</option>
          <option value="200">Up to $200</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>

        <button
          onClick={handleResetFilters}
          className="p-2 bg-gray-300 rounded-md"
        >
          Clear Filters
        </button>
      </div>

      {/* Room Listings */}
      {!filteredRooms()?.length ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-center text-gray-600 font-semibold text-lg">
            No rooms available at the moment. Please check back later.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 px-10">
          {filteredRooms()?.map((room: TRoom) => (
            <RoomCard key={room?._id} room={room} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MeetingRooms;
