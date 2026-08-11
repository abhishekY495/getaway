import { EventSchema_T } from "@repo/types";
import { View, Text, Pressable } from "react-native";

export default function EventFooter({ event }: { event: EventSchema_T }) {
  return (
    <View className="flex-row justify-between items-center p-5 px-8 border-t border-neutral-300">
      <View>
        <Text className="text-sm text-neutral-500">from</Text>
        <Text className="text-xl font-black">${event.childPrice}</Text>
      </View>
      <Pressable onPress={() => {}}>
        <Text className="text-base text-white font-black bg-purple-600 p-3 px-6 rounded-lg">
          Buy Now
        </Text>
      </Pressable>
    </View>
  );
}
