/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { TError } from "@/types";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  useGetSingleRoomQuery,
  useUpdateRoomByIdMutation,
} from "@/redux/features/room/roomApi";
import Loading from "@/components/Loading/Loading";

const UpdateRoom = () => {
  const { id } = useParams();
  const { data: roomData, isLoading: RoomIsLoading } =
    useGetSingleRoomQuery(id);
  const [updateRoomById] = useUpdateRoomByIdMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();

  // loading
  if (RoomIsLoading) {
    return <Loading />;
  }

  //   // extract data
  const room = roomData?.data;

  console.log(room);

  // Image upload function
  const uploadImageToImgBB = async (file: any) => {
    const url = `https://api.imgbb.com/1/upload?key=${"9b72c2e7f55726fd9a28bfb8bfedc08b"}`;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        return data.data.url;
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  // Amenities options
  const amenitiesOptions = [
    "Whiteboard",
    "Teleconferencing",
    "Wi-Fi",
    "Air Conditioning",
  ];

  // onSubmit function
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Updating...");

    // Mapping img
    const img = await Promise.all(
      Array.from(data.img).map((file) => uploadImageToImgBB(file))
    );

    // Mapping amenities
    const selectedAmenities = data.amenities || [];
    const additionalAmenities = data.additionalAmenities
      ? data.additionalAmenities.split(",").map((item: string) => item.trim())
      : [];

    const amenities = [...selectedAmenities, ...additionalAmenities];

    try {
      const roomInfo = {
        name: data.roomName,
        roomNo: Number(data.roomNo),
        floorNo: Number(data.floorNo),
        capacity: Number(data.capacity),
        pricePerSlot: Number(data.pricePerSlot),
        img: img.length > 0 ? img : roomData?.img,
        amenities,
      };

      console.log(roomInfo);

      console.log("actual", id, roomInfo);

      const res = await updateRoomById({ id, roomInfo }).unwrap();

      console.log(res);

      if (res) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        reset();
        navigate("/admin/rooms-list");
      }

      console.log(res);
    } catch (err) {
      const serverMsgErr =
        (err as TError)?.data?.message || "Something went wrong";

      if (serverMsgErr) {
        return toast.error(serverMsgErr, {
          id: toastId,
          duration: 3000,
        });
      } else if (err) {
        return toast.error("Something went wrong", {
          id: toastId,
          duration: 2000,
        });
      }
    }
  };

  const validateFiles = (files: any): Promise<string | true> => {
    return new Promise((resolve) => {
      if (files.length < 3) {
        resolve("At least 3 images are required");
      }
      resolve(true);
    });
  };

  return (
    <div className="mx-auto w-full bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-semibold text-indigo-700 text-center mb-4">
        Update Meeting Room
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Room Name */}
        <div className="mb-5">
          <label
            htmlFor="room-name"
            className="mb-2 block text-sm font-medium text-indigo-700"
          >
            Room Name
          </label>
          <input
            type="text"
            {...register("roomName", { required: "Room Name is required" })}
            id="room-name"
            defaultValue={room?.name}
            placeholder="Room Name"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          />
          {errors.roomName && (
            <p className="text-red-500">{errors.roomName.message as string}</p>
          )}
        </div>

        {/* Room Number, Floor Number, Capacity (3-column layout) */}
        <div className="mb-5 flex flex-wrap -mx-2">
          <div className="w-full px-2 sm:w-1/3">
            <label
              htmlFor="room-no"
              className="mb-2 block text-sm font-medium text-indigo-700"
            >
              Room Number
            </label>
            <input
              type="text"
              defaultValue={room?.roomNo}
              {...register("roomNo", {
                required: "Room Number is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Room Number must be a number",
                },
              })}
              id="room-no"
              placeholder="Room Number"
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
            />
            {errors.roomNo && (
              <p className="text-red-500">{errors.roomNo.message as string}</p>
            )}
          </div>
          <div className="w-full px-2 sm:w-1/3">
            <label
              htmlFor="floor-no"
              className="mb-2 block text-sm font-medium text-indigo-700"
            >
              Floor Number
            </label>
            <input
              type="text"
              defaultValue={room?.floorNo}
              {...register("floorNo", {
                required: "Floor Number is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Floor Number must be a number",
                },
              })}
              id="floor-no"
              placeholder="Floor Number"
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
            />
            {errors.floorNo && (
              <p className="text-red-500">{errors.floorNo.message as string}</p>
            )}
          </div>
          <div className="w-full px-2 sm:w-1/3">
            <label
              htmlFor="capacity"
              className="mb-2 block text-sm font-medium text-indigo-700"
            >
              Capacity
            </label>
            <input
              type="number"
              defaultValue={room?.capacity}
              {...register("capacity", {
                required: "Capacity is required",
                min: { value: 1, message: "Capacity must be at least 1" },
              })}
              id="capacity"
              placeholder="Capacity"
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
            />
            {errors.capacity && (
              <p className="text-red-500">
                {errors.capacity.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Price Per Slot and Image Upload in one line */}
        <div className="mb-5 flex flex-wrap -mx-2">
          <div className="w-full px-2 sm:w-1/2">
            <label
              htmlFor="price-per-slot"
              className="mb-2 block text-sm font-medium text-indigo-700"
            >
              Price per Slot
            </label>
            <input
              defaultValue={room?.pricePerSlot}
              type="number"
              {...register("pricePerSlot", {
                required: "Price per Slot is required",
                min: { value: 0, message: "Price must be a positive number" },
              })}
              id="price-per-slot"
              placeholder="Price"
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
            />
            {errors.pricePerSlot && (
              <p className="text-red-500">
                {errors.pricePerSlot.message as string}
              </p>
            )}
          </div>
          <div className="w-full px-2 sm:w-1/2">
            <label
              htmlFor="img"
              className="mb-2 block text-sm font-medium text-indigo-700"
            >
              Upload Room Images (3 images)
            </label>
            <input
              //   defaultValue={room?.img}
              type="file"
              {...register("img", {
                validate: validateFiles,
              })}
              id="img"
              accept="image/*"
              multiple
              className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
            />
            {errors.img && (
              <p className="text-red-500">{errors.img.message as string}</p>
            )}
          </div>
        </div>

        {/* Amenities section */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-indigo-700">
            Select Amenities
          </label>
          {amenitiesOptions.map((amenity) => (
            <div key={amenity} className="flex items-center mb-2">
              <input
                defaultChecked={room?.amenities.includes(amenity)}
                type="checkbox"
                {...register("amenities")}
                value={amenity}
                className="mr-2"
              />
              <label className="text-sm text-gray-700">{amenity}</label>
            </div>
          ))}
          <label
            htmlFor="additional-amenities"
            className="mb-2 block text-sm font-medium text-indigo-700 mt-4"
          >
            Additional Amenities (comma separated)
          </label>
          <input
            type="text"
            {...register("additionalAmenities")}
            id="additional-amenities"
            placeholder="Additional Amenities"
            className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:shadow-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700 transition duration-200"
        >
          Update Room
        </button>
      </form>
    </div>
  );
};

export default UpdateRoom;
