/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateRoomMutation } from "@/redux/features/room/roomApi";
import { TError } from "@/types";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateRoom = () => {
  const [createRoom] = useCreateRoomMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Image upload function
  const uploadImageToImgBB = async (file: any) => {
    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_API_KEY
    }`;

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
    const toastId = toast.loading("Creating...");
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
      const RoomInfo = {
        name: data.roomName,
        roomNo: Number(data.roomNo),
        floorNo: Number(data.floorNo),
        capacity: Number(data.capacity),
        pricePerSlot: Number(data.pricePerSlot),
        img,
        amenities,
        description: data.description, // Add description here
      };

      console.log("RoomInfo", RoomInfo);

      const res = await createRoom(RoomInfo).unwrap();

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateFiles = (files: any): Promise<string | true> => {
    return new Promise((resolve) => {
      if (files.length < 3) {
        resolve("At least 3 images are required");
      }
      resolve(true);
    });
  };

  return (
    <div className="mx-auto w-full bg-white dark:bg-gray-900 shadow-md p-8">
      <h2 className="text-2xl font-semibold text-indigo-700 dark:text-indigo-300 text-center mb-4">
        Create a Meeting Room
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Room Name */}
        <div className="mb-5">
          <label
            htmlFor="room-name"
            className="mb-2 block text-sm font-medium text-indigo-700 dark:text-indigo-300"
          >
            Room Name
          </label>
          <input
            type="text"
            {...register("roomName", { required: "Room Name is required" })}
            id="room-name"
            placeholder="Room Name"
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 outline-none focus:border-indigo-500 focus:shadow-md"
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
              className="mb-2 block text-sm font-medium text-indigo-700 dark:text-indigo-300"
            >
              Room Number
            </label>
            <input
              type="text"
              {...register("roomNo", {
                required: "Room Number is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Room Number must be a number",
                },
              })}
              id="room-no"
              placeholder="Room Number"
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 outline-none focus:border-indigo-500 focus:shadow-md"
            />
            {errors.roomNo && (
              <p className="text-red-500">{errors.roomNo.message as string}</p>
            )}
          </div>
          <div className="w-full px-2 sm:w-1/3">
            <label
              htmlFor="floor-no"
              className="mb-2 block text-sm font-medium text-indigo-700 dark:text-indigo-300"
            >
              Floor Number
            </label>
            <input
              type="text"
              {...register("floorNo", {
                required: "Floor Number is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Floor Number must be a number",
                },
              })}
              id="floor-no"
              placeholder="Floor Number"
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 outline-none focus:border-indigo-500 focus:shadow-md"
            />
            {errors.floorNo && (
              <p className="text-red-500">{errors.floorNo.message as string}</p>
            )}
          </div>
          <div className="w-full px-2 sm:w-1/3">
            <label
              htmlFor="capacity"
              className="mb-2 block text-sm font-medium text-indigo-700 dark:text-indigo-300"
            >
              Capacity
            </label>
            <input
              type="number"
              {...register("capacity", {
                required: "Capacity is required",
                min: { value: 1, message: "Capacity must be at least 1" },
              })}
              id="capacity"
              placeholder="Capacity"
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 outline-none focus:border-indigo-500 focus:shadow-md"
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
              className="mb-2 block text-sm font-medium text-indigo-700 dark:text-indigo-300"
            >
              Price per Slot
            </label>
            <input
              type="number"
              {...register("pricePerSlot", {
                required: "Price per Slot is required",
                min: { value: 0, message: "Price must be at least 0" },
              })}
              id="price-per-slot"
              placeholder="Enter price per slot"
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 outline-none focus:border-indigo-500 focus:shadow-md"
            />
            {errors.pricePerSlot && (
              <p className="text-red-500">
                {errors.pricePerSlot.message as string}
              </p>
            )}
          </div>

          <div className="w-full px-2 sm:w-1/2">
            <label
              htmlFor="room-images"
              className="mb-2 block text-sm font-medium text-indigo-700 dark:text-indigo-300"
            >
              Room Images
            </label>
            <input
              type="file"
              {...register("img", {
                required: "At least 3 images are required",
                validate: validateFiles,
              })}
              id="room-images"
              multiple
              accept="image/*"
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 outline-none focus:border-indigo-500 focus:shadow-md"
            />
            <small className="text-gray-500 dark:text-gray-400">
              Upload at least 3 images
            </small>
            {errors.img && (
              <p className="text-red-500">{errors.img.message as string}</p>
            )}
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-5">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-indigo-700 dark:text-indigo-300"
          >
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            id="description"
            placeholder="Enter a brief description of the room"
            rows={4}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 outline-none focus:border-indigo-500 focus:shadow-md"
          />
          {errors.description && (
            <p className="text-red-500">
              {errors.description.message as string}
            </p>
          )}
        </div>

        {/* Amenities Section */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2">
            Amenities
          </label>
          <div className="flex flex-wrap">
            {amenitiesOptions.map((amenity) => (
              <div key={amenity} className="mr-4 dark:text-white">
                <input
                  type="checkbox"
                  id={amenity}
                  value={amenity}
                  {...register("amenities", {
                    required: "At least 1 amenity is required",
                  })}
                />
                <label htmlFor={amenity} className="ml-2">
                  {amenity}
                </label>
              </div>
            ))}
          </div>
          {errors.amenities && (
            <p className="text-red-500">{errors.amenities.message as string}</p>
          )}
          <label
            htmlFor="additional-amenities"
            className="block text-sm font-medium text-indigo-700 dark:text-indigo-300 mt-4 mb-2"
          >
            Additional Amenities
          </label>
          <input
            type="text"
            {...register("additionalAmenities")}
            id="additional-amenities"
            placeholder="Enter any other amenities (comma separated)"
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300 outline-none focus:border-indigo-500 focus:shadow-md"
          />
        </div>

        {/* Submit Button */}
        <div className="mb-5 text-center">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white rounded-md py-3 px-4 text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Create Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRoom;
