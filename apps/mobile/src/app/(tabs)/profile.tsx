import { useAuth, useUser } from "@clerk/expo";
import { Redirect, useRouter } from "expo-router";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";

export default function ProfileScreen() {
  const { user, isLoaded } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  if (!isLoaded) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" className="text-blue-500 size-10" />
      </View>
    );
  }

  if (!user) return <Redirect href={"/(auth)/sign-in"} />;

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/(auth)/sign-in");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text>
        {user.firstName} {user.lastName}
      </Text>
      <Text>{user.emailAddresses[0].emailAddress}</Text>
      <TouchableOpacity
        className="bg-red-400 p-2 px-4 pb-2.5 rounded-lg mt-5"
        onPress={handleLogout}
      >
        <Text className="text-white font-semibold">Log out</Text>
      </TouchableOpacity>
    </View>
  );
}
