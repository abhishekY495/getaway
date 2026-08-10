import { getEvent } from "@/lib/api/events";
import { useAuth } from "@clerk/expo";
import { useQuery } from "@tanstack/react-query";

export const useGetEvent = (eventId: number) => {
  const { getToken, isSignedIn } = useAuth();

  return useQuery({
    queryKey: [eventId],
    enabled: isSignedIn,
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("No token");
      }
      return getEvent(token, eventId);
    },
  });
};
