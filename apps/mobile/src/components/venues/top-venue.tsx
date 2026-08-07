import { TopVenuesSchema_T } from "@repo/types";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { StarIcon } from "lucide-react-native";

export default function TopVenue({ venue }: { venue: TopVenuesSchema_T }) {
  const formattedReviewCount = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 0,
  }).format(venue.reviewCount);

  return (
    <View className="items-start justify-start mx-2 gap-1 w-44">
      <Image
        style={{ height: 200, width: "100%", borderRadius: 5 }}
        source={venue.coverImage}
        contentFit="cover"
      />
      <View className="flex-row gap-1 items-center justify-center -mb-1">
        <View className="flex-row gap-1 items-center justify-center">
          <StarIcon size={14} color="#E5006E" fill="#E5006E" />
          <Text className="text-sm font-semibold text-[#E5006E]">
            {venue.rating} •
          </Text>
        </View>
        <Text className="text-sm text-[#E5006E]">{formattedReviewCount}</Text>
      </View>
      <Text className="font-semibold">{venue.name}</Text>
    </View>
  );
}
