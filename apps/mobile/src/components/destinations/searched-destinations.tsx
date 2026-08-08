import { SearchResponse_T } from "@repo/types";
import { Image } from "expo-image";
import { View, Text } from "react-native";

export default function SearchedDestinations({
  destinations,
}: {
  destinations: SearchResponse_T["data"]["destinations"];
}) {
  return (
    <View className="gap-3">
      {destinations.map((destination) => {
        return (
          <View className="flex-row gap-2">
            <Image
              source={destination.coverImage}
              style={{ height: 40, width: 40, borderRadius: 5 }}
              contentFit="cover"
            />
            <View>
              <Text className="font-semibold">{destination.name}</Text>
              <Text className="text-sm">{destination.country}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
