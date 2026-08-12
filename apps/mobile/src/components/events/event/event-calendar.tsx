import {
  CALENDAR_DAY_HEIGHT,
  CALENDAR_ROW_H_SPACING,
  EventCalendarMonth,
} from "@/components/custom-flash-calendar";
import { BottomSheetFlashList as GorhomBottomSheetFlashList } from "@gorhom/bottom-sheet";
import {
  Calendar,
  toDateId,
  useCalendar,
} from "@marceloterreiro/flash-calendar";
import { EventSchema_T } from "@repo/types";
import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { View, Text, Platform, Pressable } from "react-native";

export const BottomSheetFlashList = GorhomBottomSheetFlashList;
const CalendarScrollComponent =
  Platform.OS === "android" ? (BottomSheetFlashList as any) : FlashList;

const today = new Date();
const maxDate = new Date(today.getFullYear(), today.getMonth() + 10, 0);

const todayId = toDateId(today);
const maxDateId = toDateId(maxDate);

export default function EventCalendar({
  event,
  onContinue,
}: {
  event: EventSchema_T;
  onContinue: (date: string) => void;
}) {
  const [selectedDate, setSelectedDate] = useState(todayId);
  const { weekDaysList } = useCalendar({ calendarMonthId: todayId });

  return (
    <View className="flex-1 gap-5">
      <View className="flex-row justify-between px-5 pb-3 border-b border-neutral-200">
        {weekDaysList.map((day, i) => (
          <Text
            key={`${day}-${i}`}
            className="flex-1 text-center text-neutral-500 font-bold"
          >
            {day}
          </Text>
        ))}
      </View>

      <Calendar.List
        calendarInitialMonthId={todayId}
        calendarMinDateId={todayId}
        calendarMaxDateId={maxDateId}
        calendarDayHeight={CALENDAR_DAY_HEIGHT}
        calendarRowHorizontalSpacing={CALENDAR_ROW_H_SPACING}
        onCalendarDayPress={setSelectedDate}
        calendarActiveDateRanges={[
          {
            startId: selectedDate,
            endId: selectedDate,
          },
        ]}
        CalendarScrollComponent={CalendarScrollComponent}
        renderItem={({ item }) => (
          <View className="px-5">
            <EventCalendarMonth
              calendarMonthId={item.id}
              price={event.adultPrice}
              {...item.calendarProps}
            />
          </View>
        )}
      />

      <Pressable
        className="bg-purple-600 rounded-xl p-4 mb-12 mx-5"
        onPress={() => {
          onContinue(selectedDate);
        }}
      >
        <Text className="text-white text-center font-black">Continue</Text>
      </Pressable>
    </View>
  );
}
