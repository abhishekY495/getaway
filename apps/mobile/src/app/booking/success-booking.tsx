import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function SuccessBookingScreen() {
  const { bookingReference } = useLocalSearchParams<{
    bookingReference: string;
  }>();
  const router = useRouter();
  const handleViewBookings = () => {
    router.replace("/(tabs)/bookings");
  };

  return (
    <View className="flex-1 items-center justify-center gap-8 p-5">
      <View className="justify-center items-center">
        <Image
          source={require("../../../assets/ticket.png")}
          style={{ width: 120, height: 120 }}
          contentFit="cover"
        />
        <Text className="text-3xl font-black">Booking successful! 🥳</Text>
      </View>

      <View className="gap-2">
        <View>
          <Text className="mt-3 text-center text-neutral-500">
            Your booking reference
          </Text>
          <Text className="text-lg text-neutral-500">#{bookingReference}</Text>
        </View>
        <Pressable
          onPress={handleViewBookings}
          className="rounded-lg bg-blue-500 p-3 px-8"
        >
          <Text className="text-lg text-center font-bold text-white">
            View my bookings
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
