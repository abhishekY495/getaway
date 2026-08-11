import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowLeftIcon, StarIcon } from "lucide-react-native";
import { formatReviewCount } from "@/utils/format-review-count";
import { EventSchema_T } from "@repo/types";

export default function EventHero({ event }: { event: EventSchema_T }) {
  const router = useRouter();

  return (
    <View>
      <Image
        source={event.images[0]}
        contentFit="cover"
        style={{
          width: "100%",
          height: 350,
        }}
      />
      <LinearGradient
        colors={["transparent", "#00000050", "#00000050", "#000000", "#000000"]}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 180,
        }}
      />
      <Pressable
        onPress={() => router.back()}
        className="bg-white absolute top-3 left-3 p-3 rounded-full"
      >
        <ArrowLeftIcon size={18} />
      </Pressable>
      <View className="absolute bottom-4 left-5 gap-2">
        <View className="flex-row self-start items-center gap-1 bg-pink-600 rounded-lg p-1 px-2">
          <StarIcon size={12} color="#ffffff" fill="#ffffff" />
          <Text className="text-xs font-semibold text-white">
            {event.rating}
          </Text>
          <Text className="text-white text-xs">•</Text>
          <Text className="text-xs text-white">
            ({formatReviewCount(event.reviewCount)})
          </Text>
        </View>
        <Text className="font-black text-2xl text-white">{event.title}</Text>
      </View>
    </View>
  );
}
