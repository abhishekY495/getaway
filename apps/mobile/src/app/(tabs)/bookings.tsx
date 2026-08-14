import Booking from "@/components/booking/booking";
import { useGetBookings } from "@/lib/hooks/bookings/use-get-bookings";
import { View, Text, ActivityIndicator, FlatList } from "react-native";

export default function BookingsScreen() {
  const { data, isLoading } = useGetBookings();
  const bookings = data?.data;

  if (isLoading) {
    return (
      <ActivityIndicator
        size={"large"}
        className="flex-1 justify-center items-center bg-white"
      />
    );
  }

  return (
    <View className="flex-1 bg-white px-4">
      <Text className="font-black text-3xl mb-4">Your Bookings</Text>
      <FlatList
        data={bookings}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.bookingReference.toString()}
        renderItem={({ item }) => <Booking booking={item} />}
      />
    </View>
  );
}
