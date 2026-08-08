import { getCityEvents } from "@/lib/api/events";
import { QUERY_KEYS } from "@/utils/constants";
import { useAuth } from "@clerk/expo";
import { useQuery } from "@tanstack/react-query";

export const useGetCityEvents = (cityId: number) => {
  const { getToken, isSignedIn } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEYS.search, cityId],
    enabled: isSignedIn,
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("No token");
      }
      return getCityEvents(token, cityId);
    },
  });
};
