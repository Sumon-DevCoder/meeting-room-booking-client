// import { TBooking } from "@/types/booking.types";
// import { format, parseISO } from "date-fns";

// // Count bookings per month using date-fns
// export const GetBookingChartData = ({
//   bookingData,
// }: {
//   bookingData: TBooking;
// }) => {
//   const monthCounts = {};

//   bookingData.forEach((booking: TBooking) => {
//     const month = format(parseISO(booking.createdAt), "MMM"); // Format to 'Jan', 'Feb', etc.
//     monthCounts[month] = (monthCounts[month] || 0) + 1; // Increment count for the month
//   });

//   // Prepare the chart data in the required format
//   return Object.keys(monthCounts).map((month) => ({
//     month,
//     bookings: monthCounts[month],
//   }));
// };
