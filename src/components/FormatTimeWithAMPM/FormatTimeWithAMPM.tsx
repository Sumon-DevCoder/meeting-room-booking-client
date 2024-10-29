import { format } from "date-fns";

export const FormatTimeWithAMPM = (timeString: string) => {
  const today = new Date();
  const fullDateTimeString = `${
    today.toISOString().split("T")[0]
  }T${timeString}`;
  const date = new Date(fullDateTimeString);
  return format(date, "hh:mm a");
};
