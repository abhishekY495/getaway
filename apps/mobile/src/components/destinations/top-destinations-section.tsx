import { useGetTopDestinations } from "@/lib/hooks/destinations/use-get-top-destinations";
import { View, Text, FlatList } from "react-native";
import TopDestinationSkeleton from "./top-destination-skeleton";
import TopDestination from "./top-destination";

export default function TopDestinationsSection() {
  const { data, isLoading } = useGetTopDestinations();
  const destinations = data?.data;

  return (
    <View>
      <Text className="font-black text-2xl mb-3">World's top destinations</Text>
      {isLoading ? (
        <FlatList
          data={[1, 2, 3, 4, 5]}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.toString()}
          renderItem={() => <TopDestinationSkeleton />}
        />
      ) : (
        <FlatList
          data={destinations}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TopDestination destination={item} />}
        />
      )}
    </View>
  );
}
