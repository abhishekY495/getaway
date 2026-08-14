import { getBookings } from "@/lib/api/bookings";
import { QUERY_KEYS } from "@/utils/constants";
import { useAuth } from "@clerk/expo";
import { useQuery } from "@tanstack/react-query";

export const useGetBookings = () => {
  const { getToken, isSignedIn } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEYS.getBookings],
    enabled: isSignedIn,
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("No token");
      }
      return getBookings(token);
    },
  });
};
