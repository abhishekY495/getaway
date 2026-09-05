import Booking from "@/components/booking/booking";
import { useGetBookings } from "@/lib/hooks/bookings/use-get-bookings";
import { useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";

export default function BookingsScreen() {
  const { data, isLoading, isRefetching, refetch } = useGetBookings();
  const bookings = data?.data;

  const handleRefresh = async () => {
    await refetch();
  };

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
        refreshing={isRefetching}
        onRefresh={handleRefresh}
      />
    </View>
  );
}
