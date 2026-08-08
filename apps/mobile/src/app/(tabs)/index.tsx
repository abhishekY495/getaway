import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { LinearGradient } from "expo-linear-gradient";
import TopDestinationsSection from "@/components/destinations/top-destinations-section";
import TopVenuesSection from "@/components/venues/top-venues-section";
import TopEventsSection from "@/components/events/top-events-section";
import { useEffect, useRef, useState } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import Search from "@/components/search";

const videoSource = require("@/assets/hero-video.mp4");

export default function ExploreScreen() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [sheetIndex, setSheetIndex] = useState(-1);

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    // player.play();
  });

  const openSearch = () => {
    bottomSheetRef.current?.present();
  };

  useEffect(() => {
    const handleBackButton = () => {
      if (sheetIndex !== -1) {
        bottomSheetRef.current?.dismiss();
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton,
    );

    return () => subscription.remove();
  }, [sheetIndex]);

  return (
    <>
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
              <TouchableOpacity onPress={openSearch}>
                <Text className="border border-neutral-200 mx-4 p-4 text-neutral-400 rounded-lg fixed top-[200px] bg-white shadow-2xl">
                  Search for events, places and more...
                </Text>
              </TouchableOpacity>
            </View>
            {/*  */}
            <View className="fles gap-14 mt-16 mx-4">
              <TopDestinationsSection />
              <TopVenuesSection />
              <TopEventsSection />
            </View>
            {/*  */}
          </View>
        }
      />
      {/*  */}
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={["90%"]}
        enablePanDownToClose
        enableDynamicSizing={false}
        onChange={(index) => setSheetIndex(index)}
      >
        <Search />
      </BottomSheetModal>
    </>
  );
}
