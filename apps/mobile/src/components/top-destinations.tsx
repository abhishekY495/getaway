import { TopDestinationsSchema_T } from "@repo/types";
import { View, Text, Image } from "react-native";

export default function TopDestinations({
  destination,
}: {
  destination: TopDestinationsSchema_T;
}) {
  return (
    <View className="flex-1 items-center justify-center mx-2 gap-1">
      <Image src={destination.coverImage} className="size-20 rounded-full" />
      <Text className="font-semibold">{destination.name}</Text>
    </View>
  );
}
