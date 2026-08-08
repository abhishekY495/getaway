import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useGetCityEvents } from "@/lib/hooks/events/use-get-city-events";
import Event from "@/components/events/event";

export default function CityEventsScreen() {
  const { cityId } = useLocalSearchParams();
  const { data, isLoading } = useGetCityEvents(Number(cityId));

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const result = data?.data;
  if (!result) {
    return <Text>Something went wrong...</Text>;
  }

  return (
    <ScrollView className="mb-5">
      <Text className="font-black text-2xl mb-3">
        Popular experiences in {result.city.name}
      </Text>
      <View className="">
        {result.events.map((event) => (
          <Event key={event.id} event={event} cityPage />
        ))}
      </View>
    </ScrollView>
  );
}
