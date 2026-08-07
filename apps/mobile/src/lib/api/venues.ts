import { API_URL } from "@/utils/constants";
import { GetTopVenuesResponse_T } from "@repo/types";

export const getTopVenues = async (
  token: string,
): Promise<GetTopVenuesResponse_T> => {
  const response = await fetch(`${API_URL}/venues/top`, {
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
