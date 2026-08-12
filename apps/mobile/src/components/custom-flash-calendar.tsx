import {
  Calendar,
  CalendarDayMetadata,
  CalendarItemDayWithContainerProps,
  CalendarMonthEnhanced,
  useCalendar,
} from "@marceloterreiro/flash-calendar";
import { Text, View } from "react-native";

type EventCalendarMonthProps = CalendarMonthEnhanced["calendarProps"] & {
  calendarMonthId: string;
  price: number | string;
};

export const CALENDAR_DAY_HEIGHT = 60;
export const CALENDAR_ROW_H_SPACING = 0;

const calendarTheme: CalendarItemDayWithContainerProps["theme"] = {
  base: () => ({
    container: {
      backgroundColor: "transparent",
      borderWidth: 0,
    },
  }),
  active: () => ({
    container: {
      backgroundColor: "#a855f720",
      borderWidth: 2,
      borderColor: "#a855f7",
    },
  }),
};

export function EventCalendarMonth({
  calendarMonthId,
  price,
  ...calendarProps
}: EventCalendarMonthProps) {
  const {
    calendarDayHeight = CALENDAR_DAY_HEIGHT,
    calendarRowHorizontalSpacing = CALENDAR_ROW_H_SPACING,
    onCalendarDayPress,
    ...restCalendarParams
  } = calendarProps;

  const { calendarRowMonth, weeksList } = useCalendar({
    calendarMonthId,
    ...restCalendarParams,
  });

  return (
    <View className="pb-12">
      <View className="h-10 items-start justify-center">
        <Text className="text-2xl font-black">{calendarRowMonth}</Text>
      </View>

      {weeksList.map((week, weekIndex) => (
        <Calendar.Row.Week key={weekIndex}>
          {week.map((dayMetadata: CalendarDayMetadata) => {
            if (dayMetadata.isDifferentMonth) {
              return (
                <Calendar.Item.Empty
                  key={dayMetadata.id}
                  height={calendarDayHeight}
                />
              );
            }

            const isSelected = dayMetadata.state === "active";
            const isDisabled = dayMetadata.isDisabled;

            return (
              <Calendar.Item.Day.WithContainer
                key={dayMetadata.id}
                metadata={dayMetadata}
                onPress={onCalendarDayPress}
                dayHeight={calendarDayHeight}
                daySpacing={calendarRowHorizontalSpacing}
                theme={calendarTheme}
              >
                <View className="flex-1 items-center">
                  <Text
                    className={`font-bold ${
                      isDisabled
                        ? "text-neutral-300"
                        : isSelected
                          ? "text-purple-600"
                          : "text-black"
                    }`}
                  >
                    {dayMetadata.displayLabel}
                  </Text>
                  <View
                    className={`mt-1 ${
                      isDisabled
                        ? "bg-neutral-50"
                        : isSelected
                          ? "bg-white text-purple-600"
                          : "bg-green-100 text-black"
                    }`}
                  >
                    {isDisabled ? (
                      <Text className="text-neutral-400 text-xs font-semibold">
                        -
                      </Text>
                    ) : (
                      <Text
                        className={`${isSelected ? "text-purple-700" : "text-green-700"} text-xs font-semibold`}
                      >
                        ${price}
                      </Text>
                    )}
                  </View>
                </View>
              </Calendar.Item.Day.WithContainer>
            );
          })}
        </Calendar.Row.Week>
      ))}
    </View>
  );
}
