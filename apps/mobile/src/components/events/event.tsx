import { formatReviewCount } from "@/utils/format-review-count";
import { TopEventSchema_T } from "@repo/types";
import { Image } from "expo-image";
import { StarIcon } from "lucide-react-native";
import { View, Text } from "react-native";

export default function Event({
  event,
  cityPage,
}: {
  event: TopEventSchema_T;
  cityPage?: boolean;
}) {
  return (
    <View className="items-start justify-start mx-3 my-4 gap-1">
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
      <View>
        <Text className="text-sm">from</Text>
        <Text className="text-sm font-medium">${event.lowestPrice}</Text>
      </View>
    </View>
  );
}
