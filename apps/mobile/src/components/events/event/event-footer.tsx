import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { EventSchema_T } from "@repo/types";
import { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, BackHandler } from "react-native";
import EventCalendar from "./event-calendar";
import EventBookingSelection from "./event-booking-selection";

export default function EventFooter({ event }: { event: EventSchema_T }) {
  const calendarSheetRef = useRef<BottomSheetModal>(null);
  const bookingSheetRef = useRef<BottomSheetModal>(null);
  const pendingBookingRef = useRef(false);

  const [calendarSheetIndex, setCalendarSheetIndex] = useState(-1);
  const [bookingSheetIndex, setBookingSheetIndex] = useState(-1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const handleBackButton = () => {
      if (bookingSheetIndex !== -1) {
        bookingSheetRef.current?.dismiss();
        return true;
      }
      if (calendarSheetIndex !== -1) {
        calendarSheetRef.current?.dismiss();
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton,
    );
    return () => subscription.remove();
  }, [calendarSheetIndex, bookingSheetIndex]);

  const handleContinue = (date: string) => {
    setSelectedDate(date);
    pendingBookingRef.current = true;
    calendarSheetRef.current?.dismiss();
  };

  return (
    <>
      <View className="flex-row justify-between items-center p-5 px-8 border-t border-neutral-300">
        <View>
          <Text className="text-sm text-neutral-500">from</Text>
          <Text className="text-xl font-black">${event.childPrice}</Text>
        </View>

        <Pressable
          onPress={() => {
            calendarSheetRef.current?.present();
          }}
        >
          <Text className="text-base text-white font-black bg-purple-600 p-3 px-6 rounded-lg">
            Buy Now
          </Text>
        </Pressable>
      </View>

      {/* Calendar */}
      <BottomSheetModal
        ref={calendarSheetRef}
        snapPoints={["80%"]}
        enablePanDownToClose
        enableDynamicSizing={false}
        onChange={setCalendarSheetIndex}
        onDismiss={() => {
          if (pendingBookingRef.current) {
            pendingBookingRef.current = false;
            requestAnimationFrame(() => {
              bookingSheetRef.current?.present();
            });
          }
        }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.4}
          />
        )}
      >
        <EventCalendar event={event} onContinue={handleContinue} />
      </BottomSheetModal>

      {/* Booking selection */}
      <BottomSheetModal
        ref={bookingSheetRef}
        snapPoints={["45%"]}
        enablePanDownToClose
        enableDynamicSizing={false}
        onChange={setBookingSheetIndex}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.4}
          />
        )}
      >
        {selectedDate && (
          <EventBookingSelection selectedDate={selectedDate} event={event} />
        )}
      </BottomSheetModal>
    </>
  );
}
