import { formatReviewCount } from "@/utils/format-review-count";
import { SearchResponse_T } from "@repo/types";
import { Image } from "expo-image";
import { StarIcon } from "lucide-react-native";
import { View, Text } from "react-native";

export default function SearchedEvents({
  events,
}: {
  events: SearchResponse_T["data"]["events"];
}) {
  return (
    <View className="gap-3">
      {events.map((event) => {
        return (
          <View className="flex-row gap-2" key={event.id}>
            <Image
              source={event.coverImage}
              style={{ height: 40, width: 40, borderRadius: 5 }}
              contentFit="cover"
            />
            <View className="">
              <Text className="font-semibold">{event.title}</Text>
              <View className="flex-row gap-1 -mb-1 items-center">
                <View className="flex-row gap-1 items-center">
                  <StarIcon size={12} color="#E5006E" fill="#E5006E" />
                  <Text className="text-xs font-semibold text-[#E5006E]">
                    {event.rating} •
                  </Text>
                </View>
                <Text className="text-xs text-[#E5006E]">
                  {formatReviewCount(event.reviewCount)}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}
