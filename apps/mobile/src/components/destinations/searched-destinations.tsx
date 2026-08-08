import { SearchResponse_T } from "@repo/types";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function SearchedDestinations({
  destinations,
}: {
  destinations: SearchResponse_T["data"]["destinations"];
}) {
  const router = useRouter();
  return (
    <View className="gap-3">
      {destinations.map((destination) => {
        return (
          <Pressable
            onPress={() => router.push(`/city/${destination.id}`)}
            className="flex-row gap-2"
            key={destination.id}
          >
            <Image
              source={destination.coverImage}
              style={{ height: 40, width: 40, borderRadius: 5 }}
              contentFit="cover"
            />
            <View>
              <Text className="font-semibold">{destination.name}</Text>
              <Text className="text-sm">{destination.country}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
