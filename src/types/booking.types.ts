export type TRoom = {
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  isDeleted: boolean;
  img: string[];
};

export const USER_ROLE = {
  admin: "admin",
  user: "user",
} as const;

export const USER_STATUS = {
  active: "active",
  blocked: "blocked",
} as const;

export type TUser = {
  name: string;
  email: string;
  password: string;
  status: keyof typeof USER_STATUS;
  role: keyof typeof USER_ROLE;
  phone: string;
  address: string;
};

export type TSlot = {
  roomId: string;
  roomName: string;
  roomNo: number;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: boolean;
};

export type TBooking = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  date: string;
  email: string;
  isConfirmed: "confirmed" | "unconfirmed";
  isDeleted: boolean;
  room: TRoom;
  slots: TSlot[];
  totalAmount: number;
  user: TUser;
  __v?: number;
};
