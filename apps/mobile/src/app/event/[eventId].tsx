import EventAccordian from "@/components/events/event/event-accordian";
import EventFooter from "@/components/events/event/event-footer";
import EventHero from "@/components/events/event/event-hero";
import EventOperatingHours from "@/components/events/event/event-operating-hours";
import EventOverview from "@/components/events/event/event-overview";
import { useGetEvent } from "@/lib/hooks/events/use-get-event";
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
        <EventHero event={event} />

        <View className="p-4">
          <EventOverview
            bookNowPayLater={event.bookNowPayLater}
            mealsIncluded={event.mealsIncluded}
          />
          <EventAccordian heading="Highlights" items={event.highlights} />
          <EventAccordian heading="Inclusions" items={event.inclusions} />
          <EventAccordian heading="Exclusions" items={event.exclusions} />
          <EventOperatingHours hours={event.operatingHours} />
        </View>
      </ScrollView>

      <EventFooter event={event} />
    </View>
  );
}
