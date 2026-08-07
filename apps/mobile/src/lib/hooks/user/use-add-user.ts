import { addUser } from "@/lib/api/user";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export const useAddUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (token: string) => addUser(token),
    onSuccess: () => {
      setTimeout(() => {
        router.replace("/(tabs)");
      }, 1500);
    },
    onError: (error) => {
      console.log("Error", error);
    },
  });
};
