import { ChevronDownIcon, ChevronUpIcon } from "lucide-react-native";
import { useState } from "react";
import { View, Text, Pressable } from "react-native";

export default function EventAccordian({
  heading,
  items,
}: {
  heading: string;
  items: string[];
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <View className="border-b border-neutral-200 py-6 px-2">
      <Pressable
        onPress={() => setIsOpen((prev) => !prev)}
        className="flex-row items-center justify-between"
      >
        <Text className="text-2xl font-black">{heading}</Text>
        {isOpen ? (
          <ChevronUpIcon size={22} color="#262626" />
        ) : (
          <ChevronDownIcon size={22} color="#262626" />
        )}
      </Pressable>

      {isOpen && (
        <View className="mt-4 gap-1">
          {items.map((point, index) => (
            <View key={index} className="flex-row items-start">
              <Text className="w-5 text-lg">•</Text>
              <Text className="flex-1 leading-6">{point}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
