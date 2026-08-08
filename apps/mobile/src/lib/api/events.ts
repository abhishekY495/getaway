import { API_URL } from "@/utils/constants";
import { GetCityEventsResponse_T, GetTopEventsResponse_T } from "@repo/types";

export const getTopEvents = async (
  token: string,
): Promise<GetTopEventsResponse_T> => {
  const response = await fetch(`${API_URL}/events/top`, {
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

export const getCityEvents = async (
  token: string,
  cityId: number,
): Promise<GetCityEventsResponse_T> => {
  const response = await fetch(`${API_URL}/events/by-city/${cityId}`, {
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
