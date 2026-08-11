import { OperatingHourSchema_T } from "@repo/types";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react-native";
import { useState } from "react";
import { View, Text, Pressable } from "react-native";

export default function EventOperatingHours({
  hours,
}: {
  hours: OperatingHourSchema_T[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="border-b border-neutral-200 py-6 px-2">
      <Pressable
        onPress={() => setIsOpen((prev) => !prev)}
        className="flex-row items-center justify-between"
      >
        <Text className="text-2xl font-black">Operating hours</Text>
        {isOpen ? (
          <ChevronUpIcon size={22} color="#262626" />
        ) : (
          <ChevronDownIcon size={22} color="#262626" />
        )}
      </Pressable>

      {isOpen && (
        <View className="mt-4 gap-3 px-4">
          {hours.map((item) => (
            <View
              key={item.day}
              className="flex-row items-center justify-between"
            >
              <Text className="font-medium">{item.day}</Text>
              <Text className="text-neutral-600">
                {item.open} - {item.close}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
