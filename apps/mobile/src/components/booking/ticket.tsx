import { ParsedEvent_T } from "@repo/types";
import { BabyIcon, UserIcon, UsersIcon } from "lucide-react-native";
import { View, Text } from "react-native";

export default function Ticket({
  adultQuantity,
  childQuantity,
  selectedDate,
  total,
  event,
}: {
  adultQuantity: number;
  childQuantity?: number;
  selectedDate: string;
  total: string;
  event: ParsedEvent_T;
}) {
  const date = new Date(selectedDate);
  const weekDay = date.toLocaleDateString("en-US", { weekday: "short" });
  const day = date.toLocaleDateString("en-US", { day: "numeric" });
  const month = date.toLocaleDateString("en-US", { month: "short" });

  return (
    <View className="absolute left-1/2 top-1/4 -translate-x-1/2 bg-white rounded-lg">
      <View className="flex-row items-start gap-3 p-5 border border-neutral-300">
        <View className="items-center justify-center border border-neutral-300 px-3 py-2 rounded-lg">
          <Text className="text-lg text-red-600 font-semibold">{month}</Text>
          <Text className="text-2xl font-black">{day}</Text>
          <Text className="text-neutral-500 text-sm">{weekDay}</Text>
        </View>
        {/*  */}
        <View className="flex-1 min-w-[250px] gap-1">
          <Text
            className="text-lg font-semibold leading-6"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {event.title}
          </Text>
          <View>
            <View className="flex-row gap-1 items-center">
              <UserIcon color="#5c5c5c" size={14} />
              <Text className="text-neutral-500 font-medium text-sm">
                {adultQuantity} adult
              </Text>
            </View>
            {childQuantity && (
              <View className="flex-row gap-1 items-center">
                <BabyIcon color="#5c5c5c" size={14} />
                <Text className="text-neutral-500 font-medium text-sm">
                  {childQuantity} child
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      {/*  */}
      <View className="flex-row items-center justify-between px-4 py-2 pb-2.5">
        <Text className="font-semibold">Total payable</Text>
        <Text className="text-neutral-700 font-medium text-sm">
          ${Number(total).toFixed(2)}
        </Text>
      </View>
    </View>
  );
}
