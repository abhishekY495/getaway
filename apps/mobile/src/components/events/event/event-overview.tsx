import {
  BanknoteIcon,
  CalendarIcon,
  ClockIcon,
  SaladIcon,
} from "lucide-react-native";
import { View, Text } from "react-native";

export default function EventOverview({
  bookNowPayLater,
  mealsIncluded,
}: {
  bookNowPayLater: boolean;
  mealsIncluded: boolean;
}) {
  return (
    <View className="gap-3 border-b border-neutral-200 pb-6">
      <View className="flex-row items-center gap-3">
        <View className="border border-neutral-200 p-3 self-start rounded-lg">
          <CalendarIcon color="#262626" size={22} />
        </View>
        <Text className="font-bold">Open Today</Text>
      </View>
      {/*  */}
      <View className="flex-row items-center gap-3">
        <View className="border border-neutral-200 p-3 self-start rounded-lg">
          <ClockIcon color="#262626" size={22} />
        </View>
        <View className="flex-1">
          <Text className="font-bold">Explore at your won pace</Text>
          <Text className="text-sm text-neutral-500">
            Choose your entry time, Stay as long as you like
          </Text>
        </View>
      </View>
      {/*  */}
      {bookNowPayLater && (
        <View className="flex-row items-center gap-3">
          <View className="border border-neutral-200 p-3 self-start rounded-lg">
            <BanknoteIcon color="#262626" size={22} />
          </View>
          <View className="flex-1">
            <Text className="font-bold">Book now pay later</Text>
            <Text className="text-sm text-neutral-500" numberOfLines={2}>
              Book now without paying anything. Cancel for free if your plans
              change
            </Text>
          </View>
        </View>
      )}
      {/*  */}
      {mealsIncluded && (
        <View className="flex-row items-center gap-3">
          <View className="border border-neutral-200 p-3 self-start rounded-lg">
            <SaladIcon color="#262626" size={22} />
          </View>
          <View className="flex-1">
            <Text className="font-bold">Meals Included</Text>
            <Text className="text-sm text-neutral-500" numberOfLines={2}>
              Food will be available and served
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
