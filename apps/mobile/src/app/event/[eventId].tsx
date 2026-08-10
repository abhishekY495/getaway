import { useGetEvent } from "@/lib/hooks/events/use-get-event";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function EventScreen() {
  const { eventId } = useLocalSearchParams();
  const { data, isLoading } = useGetEvent(Number(eventId));
  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);

  const headerStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isSticky ? 1 : 0, {
        duration: 200,
      }),
      transform: [
        {
          translateY: withTiming(isSticky ? 0 : -10, {
            duration: 300,
          }),
        },
      ],
    };
  });

  if (isLoading) {
    return (
      <ActivityIndicator
        size={"large"}
        className="flex-1 justify-center items-center bg-white"
      />
    );
  }

  const event = data?.data;
  if (!event) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-xl">Something went wrong...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Sticky header */}
      <Animated.View
        style={headerStyle}
        className="absolute top-0 left-0 right-0 z-50 bg-white border-b border-neutral-300 shadow-2xl flex-row items-center gap-2 p-3"
        pointerEvents={isSticky ? "auto" : "none"}
      >
        <Pressable onPress={() => router.back()}>
          <ArrowLeftIcon size={18} />
        </Pressable>
        <Text numberOfLines={1} className="flex-1 text-lg font-semibold">
          {event.title}
        </Text>
      </Animated.View>

      {/* Content */}
      <ScrollView
        scrollEventThrottle={16}
        onScroll={(event) => {
          const y = event.nativeEvent.contentOffset.y;
          const sticky = y >= 300;
          if (sticky !== isSticky) {
            setIsSticky(sticky);
          }
        }}
      >
        <View>
          <Image
            source={event.images[0]}
            contentFit="cover"
            style={{
              width: "100%",
              height: 350,
            }}
          />
          <LinearGradient
            colors={[
              "transparent",
              "#00000050",
              "#00000050",
              "#000000",
              "#000000",
            ]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 180,
            }}
          />
          <Pressable
            onPress={() => router.back()}
            className="bg-white absolute top-3 left-3 p-3 rounded-full"
          >
            <ArrowLeftIcon size={18} />
          </Pressable>
          <Text className="font-black text-2xl absolute text-white bottom-4 left-5">
            {event.title}
          </Text>
        </View>
        {/*  */}
        <View className="px-3 py-2 pb-20">
          <Text>Your long event content goes here...</Text>
          <Text>{event.highlights}</Text>
          <Text>{event.inclusions}</Text>
          <Text>{event.exclusions}</Text>
          <Text>{event.highlights}</Text>
          <Text>{event.inclusions}</Text>
          <Text>{event.exclusions}</Text>
          <Text>{event.highlights}</Text>
          <Text>{event.inclusions}</Text>
          <Text>{event.exclusions}</Text>
          <Text>{event.highlights}</Text>
          <Text>{event.inclusions}</Text>
          <Text>{event.exclusions}</Text>
          <Text>{event.highlights}</Text>
          <Text>{event.inclusions}</Text>
          <Text>{event.exclusions}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
