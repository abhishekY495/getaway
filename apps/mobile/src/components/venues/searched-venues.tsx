import { SearchResponse_T } from "@repo/types";
import { Image } from "expo-image";
import { StarIcon } from "lucide-react-native";
import { View, Text } from "react-native";

export default function SearchedVenues({
  venues,
}: {
  venues: SearchResponse_T["data"]["venues"];
}) {
  return (
    <View className="gap-3">
      {venues.map((venue) => {
        const formattedReviewCount = new Intl.NumberFormat("en", {
          notation: "compact",
          maximumFractionDigits: 0,
        }).format(venue.reviewCount);

        return (
          <View className="flex-row gap-2">
            <Image
              source={venue.coverImage}
              style={{ height: 40, width: 40, borderRadius: 5 }}
              contentFit="cover"
            />
            <View>
              <Text className="font-semibold">{venue.name}</Text>
              <View className="flex-row gap-1 items-center">
                <View className="flex-row gap-1 items-center">
                  <StarIcon size={12} color="#E5006E" fill="#E5006E" />
                  <Text className="text-xs font-semibold text-[#E5006E]">
                    {venue.rating} •
                  </Text>
                </View>
                <Text className="text-xs text-[#E5006E]">
                  {formattedReviewCount}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}
