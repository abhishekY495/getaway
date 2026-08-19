import { addExpoPushToken } from "@/lib/api/user";
import { useAuth } from "@clerk/expo";
import { ExpoPushTokenSchema_T } from "@repo/types";
import { useMutation } from "@tanstack/react-query";

export const useAddExpoPushToken = () => {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (expoToken: ExpoPushTokenSchema_T) => {
      const token = await getToken();
      if (!token) {
        throw new Error("No token");
      }
      return addExpoPushToken(token, expoToken);
    },
  });
};
