import { TopDestinationSchema_T } from "@repo/types";
import { Image } from "expo-image";
import { View, Text } from "react-native";

export default function TopDestination({
  destination,
}: {
  destination: TopDestinationSchema_T;
}) {
  return (
    <View className="flex-1 items-center justify-center mx-2 gap-1">
      <Image
        source={destination.coverImage}
        style={{ height: 70, width: 70, borderRadius: 100 }}
      />
      <Text className="font-semibold">{destination.name}</Text>
    </View>
  );
}
