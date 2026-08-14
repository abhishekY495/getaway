import { API_URL } from "@/utils/constants";
import { AllBookingsSchemaResponse_T } from "@repo/types";

export const getBookings = async (
  token: string,
): Promise<AllBookingsSchemaResponse_T> => {
  const response = await fetch(`${API_URL}/bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
};
