import { getTopDestinations } from "@/lib/api/destinations";
import { QUERY_KEYS } from "@/utils/constants";
import { useAuth } from "@clerk/expo";
import { useQuery } from "@tanstack/react-query";

export const useGetTopDestinations = () => {
  const { getToken, isSignedIn } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEYS.getTopDestinations],
    enabled: isSignedIn,
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("No token");
      }
      return getTopDestinations(token);
    },
  });
};
