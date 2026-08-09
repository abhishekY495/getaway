import { TopVenueSchema_T } from "@repo/types";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { StarIcon } from "lucide-react-native";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import { formatReviewCount } from "@/utils/format-review-count";

export default function TopVenue({ venue }: { venue: TopVenueSchema_T }) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/venue/${venue.id}`)}
      className="items-start justify-start mx-2 gap-1 w-44"
    >
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
        <Text className="text-sm text-[#E5006E]">
          {formatReviewCount(venue.reviewCount)}
        </Text>
      </View>
      <Text className="font-semibold">{venue.name}</Text>
    </Pressable>
  );
}
