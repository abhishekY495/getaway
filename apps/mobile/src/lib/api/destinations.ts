import { API_URL } from "@/utils/constants";
import { GetTopDestinationsResponse_T } from "@repo/types";

export const getTopDestinations = async (
  token: string,
): Promise<GetTopDestinationsResponse_T> => {
  const response = await fetch(`${API_URL}/destinations/top`, {
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
