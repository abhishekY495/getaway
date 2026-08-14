import { AllBookingsSchema_T } from "@repo/types";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { BabyIcon, UserIcon } from "lucide-react-native";
import { View, Text, Pressable } from "react-native";

export default function Booking({ booking }: { booking: AllBookingsSchema_T }) {
  const router = useRouter();
  const date = new Date(booking.visitDate);
  const weekDay = date.toLocaleDateString("en-US", { weekday: "short" });
  const day = date.toLocaleDateString("en-US", { day: "numeric" });
  const month = date.toLocaleDateString("en-US", { month: "short" });

  return (
    <Pressable
      className="flex-1 mb-10 border border-neutral-300 rounded-lg"
      onPress={() => router.push(`/event/${booking.eventId}`)}
    >
      <View className="flex-1">
        <Image
          source={booking.eventCoverImage}
          style={{ width: "100%", height: 150 }}
          contentFit="cover"
        />
        <LinearGradient
          colors={["transparent", "#00000010"]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 150,
          }}
        />
      </View>
      {/*  */}
      <View className="p-3 border-b border-neutral-300">
        <View className="flex-row items-start gap-3">
          <View className="items-center justify-center border border-neutral-300 px-3 py-2 rounded-lg">
            <Text className="text-lg text-red-600 font-semibold">{month}</Text>
            <Text className="text-2xl font-black">{day}</Text>
            <Text className="text-neutral-500 text-sm">{weekDay}</Text>
          </View>
          {/*  */}
          <View className="flex-1 min-w-[250px] gap-1">
            <Text
              className="text-xl font-semibold leading-6"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {booking.eventTitle}
            </Text>
            <View className="flex-row gap-2">
              <View className="flex-row gap-1 items-center">
                <UserIcon color="#5c5c5c" size={14} />
                <Text className="text-neutral-500 font-medium text-base">
                  {booking.adultQuantity} adult
                </Text>
              </View>
              {booking.childQuantity > 0 && (
                <>
                  <Text className="text-base">/</Text>
                  <View className="flex-row gap-1 items-center">
                    <BabyIcon color="#5c5c5c" size={14} />
                    <Text className="text-neutral-500 font-medium text-base">
                      {booking.childQuantity} child
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </View>
      {/*  */}
      <View className="flex-row items-center justify-between px-4 py-2 pb-2.5">
        <Text className="font-semibold">#{booking.bookingReference}</Text>
        <Text className="font-medium text-sm">
          ${Number(booking.totalAmount).toFixed(2)}
        </Text>
      </View>
    </Pressable>
  );
}
