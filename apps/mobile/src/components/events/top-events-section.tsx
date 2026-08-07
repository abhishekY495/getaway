import { useGetTopEvents } from "@/lib/hooks/events/use-get-top-events";
import { View, Text, ActivityIndicator } from "react-native";
import TopEvent from "./top-event";

export default function TopEventsSection() {
  const { data, isLoading } = useGetTopEvents();
  const topEvents = data?.data;

  return (
    <View className="mb-14">
      <Text className="font-black text-2xl mb-3">
        Popular experiences worldwide
      </Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        topEvents && (
          <View className="flex-row flex-wrap">
            {topEvents.map((event) => (
              <View key={event.id} className="w-1/2">
                <TopEvent event={event} />
              </View>
            ))}
          </View>
        )
      )}
    </View>
  );
}
