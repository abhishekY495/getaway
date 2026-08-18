import { API_URL } from "@/utils/constants";
import { ChatResponseSchema_T } from "@repo/types";

export const chatMessage = async (
  token: string,
  message: string,
  previousInteractionId?: string,
): Promise<ChatResponseSchema_T> => {
  const messageData = {
    message,
    previousInteractionId,
  };

  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
};
