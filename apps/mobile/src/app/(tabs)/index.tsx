import { View, StyleSheet, TextInput, FlatList } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { LinearGradient } from "expo-linear-gradient";
import TopDestinationsSection from "@/components/destinations/top-destinations-section";
import TopVenuesSection from "@/components/venues/top-venues-section";
import TopEventsSection from "@/components/events/top-events-section";

const videoSource = require("@/assets/hero-video.mp4");

export default function ExploreScreen() {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    // player.play();
  });

  return (
    <FlatList
      data={[]}
      renderItem={null}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View className="bg-white">
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
          <View className="fles gap-14 mt-16 mx-4">
            <TopDestinationsSection />
            <TopVenuesSection />
            <TopEventsSection />
          </View>
        </View>
      }
    />
  );
}
