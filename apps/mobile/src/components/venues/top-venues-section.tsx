import { useGetTopVenues } from "@/lib/hooks/venues/use-get-top-venues";
import { View, Text, FlatList } from "react-native";
import TopVenueSkeleton from "./top-venue-skeleton";
import TopVenue from "./top-venue";

export default function TopVenuesSection() {
  const { data, isLoading } = useGetTopVenues();
  const topVenues = data?.data;

  return (
    <View>
      <Text className="font-black text-2xl mb-3">Top attractions globally</Text>
      {isLoading ? (
        <FlatList
          data={[1, 2, 3, 4, 5]}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.toString()}
          renderItem={() => <TopVenueSkeleton />}
        />
      ) : (
        <FlatList
          data={topVenues}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TopVenue venue={item} />}
        />
      )}
    </View>
  );
}
