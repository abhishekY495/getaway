import { useAuth } from "@clerk/expo";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/user";
import { QUERY_KEYS } from "@/utils/constants";

export const useGetuser = () => {
  const { getToken, isSignedIn } = useAuth();

  return useQuery({
    queryKey: [QUERY_KEYS.getUser],
    enabled: isSignedIn,
    queryFn: async () => {
      const token = await getToken();
      if (!token) {
        throw new Error("No token");
      }
      return getUser(token);
    },
  });
};
