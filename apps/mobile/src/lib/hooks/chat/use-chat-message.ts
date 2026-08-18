import { chatMessage } from "@/lib/api/chat";
import { useAuth } from "@clerk/expo";
import { ChatRequestSchema_T } from "@repo/types";
import { useMutation } from "@tanstack/react-query";

export const useChatMessage = () => {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async ({
      message,
      previousInteractionId,
    }: ChatRequestSchema_T) => {
      const token = await getToken();
      if (!token) {
        throw new Error("No token");
      }
      return chatMessage(token, message, previousInteractionId);
    },
  });
};
