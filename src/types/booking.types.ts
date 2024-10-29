export type TBooking = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  date: string;
  email: string;
  isConfirmed: "confirmed" | "unconfirmed";
  isDeleted: boolean;
  room: string; // Assuming this is a reference ID to a room
  slots: string[]; // Array of slot IDs
  totalAmount: number;
  user: string; // Assuming this is a reference ID to a user
  __v?: number;
};
