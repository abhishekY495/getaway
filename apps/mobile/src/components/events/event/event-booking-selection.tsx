import { EventSchema_T } from "@repo/types";
import { useRouter } from "expo-router";
import { MinusIcon, PlusIcon } from "lucide-react-native";
import { useState } from "react";
import { View, Text, Pressable } from "react-native";

export default function EventBookingSelection({
  selectedDate,
  event,
}: {
  selectedDate: string;
  event: EventSchema_T;
}) {
  const router = useRouter();
  const [adultQuantity, setAdultQuantity] = useState(1);
  const [childQuantity, setChildQuantity] = useState(0);

  const total =
    adultQuantity * Number(event.adultPrice) +
    childQuantity * Number(event.childPrice);

  const date = new Date(selectedDate);
  const formatted = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <View className="flex-1 px-5">
      <View className="border-b border-neutral-200 pb-4">
        <Text className="text-2xl font-black">Select number of tickets</Text>
        <Text className="text-sm text-neutral-500 -mt-1 font-medium">
          {formatted}
        </Text>
      </View>

      <View className="flex-1">
        {/*  */}
        <View className="flex-row items-center border-b border-dashed border-neutral-300 py-5">
          <View className="flex-1">
            <Text className="font-bold">Adult</Text>
            <Text className="text-sm text-neutral-500 -mt-1">Above 15 yrs</Text>
          </View>
          <View className="flex-1 flex-row items-center justify-center gap-5">
            <Pressable
              className="p-1 bg-purple-100 rounded-full"
              onPress={() => setAdultQuantity((prev) => Math.max(1, prev - 1))}
            >
              <MinusIcon size={24} color="#a855f7" />
            </Pressable>
            <Text className="font-semibold">{adultQuantity}</Text>
            <Pressable
              className="p-1 bg-purple-100 rounded-full"
              onPress={() => setAdultQuantity((prev) => prev + 1)}
            >
              <PlusIcon size={24} color="#a855f7" />
            </Pressable>
          </View>
          <View className="flex-1 items-end">
            <Text className="text-neutral-700 font-semibold">
              ${Number(event.adultPrice).toFixed(2)}
            </Text>
          </View>
        </View>
        {/*  */}
        <View className="flex-row items-center border-b border-dashed border-neutral-300 py-5">
          <View className="flex-1">
            <Text className="font-bold">Child</Text>
            <Text className="text-sm text-neutral-500 -mt-1">2 to 14 yrs</Text>
          </View>
          <View className="flex-1 flex-row items-center justify-center gap-5">
            <Pressable
              className="p-1 bg-purple-100 rounded-full"
              onPress={() => setChildQuantity((prev) => Math.max(0, prev - 1))}
            >
              <MinusIcon size={24} color="#a855f7" />
            </Pressable>
            <Text className="font-semibold">{childQuantity}</Text>
            <Pressable
              className="p-1 bg-purple-100 rounded-full"
              onPress={() => setChildQuantity((prev) => prev + 1)}
            >
              <PlusIcon size={24} color="#a855f7" />
            </Pressable>
          </View>
          <View className="flex-1 items-end">
            <Text className="text-neutral-700 font-semibold">
              ${Number(event.childPrice).toFixed(2)}
            </Text>
          </View>
        </View>
        {/*  */}
        <View className="flex-row justify-between items-center py-5">
          <Text className="text-xl font-bold">Total payable</Text>
          <Text className="text-xl font-bold">${total.toFixed(2)}</Text>
        </View>
      </View>

      <Pressable
        className="bg-purple-600 rounded-xl p-4 mb-12"
        onPress={() =>
          router.push({
            pathname: "/booking",
            params: {
              adultQuantity: adultQuantity.toString(),
              childQuantity: childQuantity.toString(),
              selectedDate,
              total: String(total),
              event: JSON.stringify({
                id: event.id,
                title: event.title,
                coverImage: event.images[0],
              }),
            },
          })
        }
      >
        <Text className="text-white text-center font-black">Next</Text>
      </Pressable>
    </View>
  );
}
