import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { LinearGradient } from "expo-linear-gradient";
import { useGetTopDestinations } from "@/lib/hooks/destinations/use-get-top-destinations";
import TopDestinationsSkeleton from "@/components/top-destinations-skeleton";
import TopDestinations from "@/components/top-destinations";

const videoSource = require("@/assets/hero-video.mp4");

export default function ExploreScreen() {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    // player.play();
  });

  const { data, isLoading } = useGetTopDestinations();
  const destinations = data?.data;

  return (
    <View className="flex-1 bg-white">
      <View className="w-full h-[220px]">
        <VideoView
          player={player}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          nativeControls={false}
          pointerEvents="none"
        />
        <LinearGradient
          colors={["transparent", "#11111190", "#11111190"]}
          style={StyleSheet.absoluteFill}
        />
        <TextInput
          className="border border-neutral-200 mx-4 p-4 placeholder:text-neutral-400 rounded-lg fixed top-[200px] bg-white shadow-2xl"
          placeholder="Search for events, places and more..."
        />
      </View>
      {/*  */}
      <View className="mt-16 mx-4">
        <Text className="font-black text-2xl mb-3">
          World's top destinations
        </Text>
        {isLoading ? (
          <FlatList
            data={[1, 2, 3, 4, 5]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.toString()}
            renderItem={() => <TopDestinationsSkeleton />}
          />
        ) : (
          <FlatList
            data={destinations}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <TopDestinations destination={item} />}
          />
        )}
      </View>
    </View>
  );
}
