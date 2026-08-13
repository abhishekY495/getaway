import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { ParsedEvent_T } from "@repo/types";
import { useState } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { ArrowLeftIcon } from "lucide-react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Ticket from "@/components/booking/ticket";
import GuestDetails from "@/components/booking/guest-details";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function BookingScreen() {
  const { adultQuantity, childQuantity, selectedDate, total, event } =
    useLocalSearchParams<{
      adultQuantity: string;
      childQuantity: string;
      selectedDate: string;
      total: string;
      event: string;
    }>();
  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);
  const parsedEvent = JSON.parse(event) as ParsedEvent_T;

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

  return (
    <View className="flex-1 bg-white">
      <Animated.View
        style={headerStyle}
        className="absolute top-0 left-0 right-0 z-50 bg-white border-b border-neutral-300 shadow-2xl flex-row items-center gap-2 p-3"
        pointerEvents={isSticky ? "auto" : "none"}
      >
        <Pressable onPress={() => router.back()}>
          <ArrowLeftIcon size={18} />
        </Pressable>
        <Text numberOfLines={1} className="flex-1 text-lg font-semibold">
          Review and Pay
        </Text>
      </Animated.View>

      <KeyboardAwareScrollView
        scrollEventThrottle={16}
        onScroll={(event) => {
          const y = event.nativeEvent.contentOffset.y;
          const sticky = y >= 300;
          if (sticky !== isSticky) {
            setIsSticky(sticky);
          }
        }}
        className="bg-white flex-1"
      >
        <View className="flex-1">
          <Image
            source={parsedEvent.coverImage}
            style={{ height: 300, width: "100%" }}
            contentFit="cover"
          />
          <LinearGradient
            colors={["transparent", "#00000050", "#000000"]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 200,
            }}
          />
          <Pressable
            onPress={() => router.back()}
            className="bg-neutral-100 absolute top-3 left-3 p-3 rounded-full"
          >
            <ArrowLeftIcon size={18} />
          </Pressable>
          <Ticket
            adultQuantity={Number(adultQuantity)}
            childQuantity={Number(childQuantity)}
            selectedDate={selectedDate}
            total={total}
            event={parsedEvent}
          />
        </View>
        <GuestDetails
          adultQuantity={Number(adultQuantity)}
          childQuantity={Number(childQuantity)}
          selectedDate={selectedDate}
          total={total}
        />
      </KeyboardAwareScrollView>
    </View>
  );
}
