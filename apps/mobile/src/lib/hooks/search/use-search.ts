import { search } from "@/lib/api/search";
import { QUERY_KEYS } from "@/utils/constants";
import { useAuth } from "@clerk/expo";
import { useQuery } from "@tanstack/react-query";

export const useSearch = (query: string) => {
  const { getToken, isSignedIn } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEYS.search, query],
    enabled: isSignedIn && query.trim().length > 0,
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("No token");
      }
      return search(token, query);
    },
  });
};
