import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { EventSchema_T } from "@repo/types";
import { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, BackHandler } from "react-native";
import EventCalendar from "./event-calendar";

export default function EventFooter({ event }: { event: EventSchema_T }) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [sheetIndex, setSheetIndex] = useState(-1);

  useEffect(() => {
    const handleBackButton = () => {
      if (sheetIndex !== -1) {
        bottomSheetRef.current?.dismiss();
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton,
    );

    return () => subscription.remove();
  }, [sheetIndex]);

  return (
    <>
      <View className="flex-row justify-between items-center p-5 px-8 border-t border-neutral-300">
        <View>
          <Text className="text-sm text-neutral-500">from</Text>
          <Text className="text-xl font-black">${event.childPrice}</Text>
        </View>

        <Pressable
          onPress={() => {
            bottomSheetRef.current?.present();
          }}
        >
          <Text className="text-base text-white font-black bg-purple-600 p-3 px-6 rounded-lg">
            Buy Now
          </Text>
        </Pressable>
      </View>

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={["80%"]}
        enablePanDownToClose
        enableDynamicSizing={false}
        onChange={setSheetIndex}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.4}
          />
        )}
      >
        <EventCalendar event={event} />
      </BottomSheetModal>
    </>
  );
}
