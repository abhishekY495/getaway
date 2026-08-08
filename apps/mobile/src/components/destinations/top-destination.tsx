import { TopDestinationSchema_T } from "@repo/types";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function TopDestination({
  destination,
}: {
  destination: TopDestinationSchema_T;
}) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/city/${destination.id}`)}
      className="flex-1 items-center justify-center mx-2 gap-1"
    >
      <Image
        source={destination.coverImage}
        style={{ height: 70, width: 70, borderRadius: 100 }}
      />
      <Text className="font-semibold">{destination.name}</Text>
    </Pressable>
  );
}
