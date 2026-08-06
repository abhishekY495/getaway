import { useAddUser } from "@/lib/hooks/user/use-add-user";
import { useAuth } from "@clerk/expo";
import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";

export default function SetupAccount() {
  const { mutate } = useAddUser();
  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const setup = async () => {
      const token = await getToken();
      if (!token) {
        console.log("No token");
        return;
      }

      mutate(token);
    };

    setup();
  }, [isLoaded, isSignedIn, getToken, mutate]);

  return (
    <View className="flex-1 gap-5 justify-center items-center bg-white">
      <ActivityIndicator size="large" />
      <Text className="text-xl font-semibold">Setting up your account</Text>
    </View>
  );
}
