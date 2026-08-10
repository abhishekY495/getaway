import { formatReviewCount } from "@/utils/format-review-count";
import { TopEventSchema_T } from "@repo/types";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StarIcon } from "lucide-react-native";
import { View, Text, Pressable } from "react-native";

export default function Event({
  event,
  cityPage,
}: {
  event: TopEventSchema_T;
  cityPage?: boolean;
}) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/event/${event.id}`)}
      className="items-start justify-start mx-3 my-4 gap-1"
    >
      <Image
        style={{ height: cityPage ? 200 : 100, width: "100%", borderRadius: 5 }}
        source={event.coverImage}
        contentFit="cover"
      />
      <View className="flex-row gap-1 items-center justify-center -mb-1">
        <View className="flex-row gap-1 items-center justify-center">
          <StarIcon size={14} color="#E5006E" fill="#E5006E" />
          <Text className="text-sm font-semibold text-[#E5006E]">
            {event.rating} •
          </Text>
        </View>
        <Text className="text-sm text-[#E5006E]">
          {formatReviewCount(event.reviewCount)}
        </Text>
      </View>
      <Text className="font-semibold">{event.title}</Text>
      <View className="w-full flex-row justify-between items-center">
        <View>
          <Text className="text-sm">from</Text>
          <Text className="text-sm font-medium">${event.lowestPrice}</Text>
        </View>
        {cityPage && (
          <Text className="bg-[#ff54a6] text-white py-1.5 pb-2 px-5 rounded-lg">
            Buy
          </Text>
        )}
      </View>
    </Pressable>
  );
}
