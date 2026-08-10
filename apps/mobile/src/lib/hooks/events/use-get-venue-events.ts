import { getVenueEvents } from "@/lib/api/events";
import { useAuth } from "@clerk/expo";
import { useQuery } from "@tanstack/react-query";

export const useVenueCityEvents = (venueId: number) => {
  const { getToken, isSignedIn } = useAuth();

  return useQuery({
    queryKey: [venueId],
    enabled: isSignedIn,
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("No token");
      }
      return getVenueEvents(token, venueId);
    },
  });
};
