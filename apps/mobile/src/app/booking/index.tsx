import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { EventSchema_T } from "@repo/types";

export default function BookingScreen() {
  const { adultQuantity, childQuantity, selectedDate, event } =
    useLocalSearchParams<{
      adultQuantity: string;
      childQuantity: string;
      selectedDate: string;
      event: string;
    }>();

  const parsedEvent = JSON.parse(event) as EventSchema_T;

  return (
    <View>
      <Text>BookingScreen</Text>
      <Text>Adults: {adultQuantity}</Text>
      <Text>Children: {childQuantity}</Text>
      <Text>Date: {selectedDate}</Text>
      <Text>Event: {parsedEvent.id}</Text>
      <Text>Event: {parsedEvent.title}</Text>
    </View>
  );
}
