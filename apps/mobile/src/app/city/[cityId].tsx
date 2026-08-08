import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useGetCityEvents } from "@/lib/hooks/events/use-get-city-events";
import Event from "@/components/events/event";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

export default function CityEventsScreen() {
  const { cityId } = useLocalSearchParams();
  const { data, isLoading } = useGetCityEvents(Number(cityId));

  if (isLoading) {
    return (
      <ActivityIndicator
        size={"large"}
        className="flex-1 justify-center items-center"
      />
    );
  }

  const result = data?.data;
  if (!result) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl">Something went wrong...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="mb-5 bg-white">
      <View className="relative">
        <Image
          source={result.city.coverImage}
          style={{ height: 200, width: "100%" }}
          contentFit="cover"
        />
        <LinearGradient
          colors={[
            "transparent",
            "#00000050",
            "#00000050",
            "#000000",
            "#000000",
          ]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 180,
          }}
        />
        <Text className="font-black text-2xl absolute text-white bottom-4 left-5">
          Popular experiences in {result.city.name}
        </Text>
      </View>
      <View className="mx-1">
        {result.events.map((event) => (
          <Event key={event.id} event={event} cityPage />
        ))}
      </View>
    </ScrollView>
  );
}
