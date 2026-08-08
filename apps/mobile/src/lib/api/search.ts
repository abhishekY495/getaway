import { API_URL } from "@/utils/constants";
import { SearchResponse_T } from "@repo/types";

export const search = async (
  token: string,
  query: string,
): Promise<SearchResponse_T> => {
  const response = await fetch(
    `${API_URL}/search?q=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
};
