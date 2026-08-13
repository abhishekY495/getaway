import { useUser } from "@clerk/expo";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

export default function GuestDetails({
  adultQuantity,
  childQuantity,
  selectedDate,
  total,
}: {
  adultQuantity: number;
  childQuantity?: number;
  selectedDate: string;
  total: string;
}) {
  const { user } = useUser();

  const [bookingData, setBookingData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    cardNumber: "",
    cvv: "",
  });

  const isFormValid =
    bookingData.fullName.trim() !== "" &&
    bookingData.email.trim() !== "" &&
    bookingData.mobileNumber.trim().length === 10 &&
    bookingData.cardNumber.trim().length === 16 &&
    bookingData.cvv.trim().length === 3;

  useEffect(() => {
    if (user) {
      setBookingData((prev) => ({
        ...prev,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.emailAddresses[0]?.emailAddress,
      }));
    }
  }, [user]);

  if (!user) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  return (
    <>
      <View className="gap-3 p-4 py-3">
        <Text className="text-2xl font-black">Guest details</Text>
        <View className="gap-1">
          <Text className="text-sm font-medium text-neutral-500">
            Full name
          </Text>
          <TextInput
            value={bookingData.fullName}
            onChangeText={(text) =>
              setBookingData((prev) => ({ ...prev, fullName: text }))
            }
            className="text-base border border-neutral-300 placeholder:text-neutral-400/60 rounded-lg px-3 py-2"
          />
        </View>
        <View className="gap-1">
          <Text className="text-sm font-medium text-neutral-500">Email</Text>
          <TextInput
            value={bookingData.email}
            onChangeText={(text) =>
              setBookingData((prev) => ({
                ...prev,
                email: text,
              }))
            }
            className="text-base border border-neutral-300 placeholder:text-neutral-400/60 rounded-lg px-3 py-2"
          />
        </View>
        <View className="gap-1">
          <Text className="text-sm font-medium text-neutral-500">
            Mobile number
          </Text>
          <TextInput
            value={bookingData.mobileNumber}
            onChangeText={(text) =>
              setBookingData((prev) => ({
                ...prev,
                mobileNumber: text,
              }))
            }
            className="text-base border border-neutral-300 placeholder:text-neutral-400/60 rounded-lg px-3 py-2"
            placeholder="9846513207"
            keyboardType="number-pad"
            maxLength={10}
          />
        </View>
        {/*  */}
        <View className="w-full border-b border-dashed border-neutral-300 mt-5 my-4"></View>
        {/*  */}
        <View className="gap-1">
          <Text className="text-sm font-medium text-neutral-500">
            Card number
          </Text>
          <TextInput
            value={bookingData.cardNumber}
            onChangeText={(text) =>
              setBookingData((prev) => ({
                ...prev,
                cardNumber: text,
              }))
            }
            placeholder="1234 5678 9012 3456"
            keyboardType="number-pad"
            maxLength={16}
            className="text-base border border-neutral-300 placeholder:text-neutral-400/60 rounded-lg px-3 py-2"
          />
        </View>
        <View className="gap-1">
          <Text className="text-sm font-medium text-neutral-500">
            Security code / CVV
          </Text>
          <TextInput
            value={bookingData.cvv}
            onChangeText={(text) =>
              setBookingData((prev) => ({
                ...prev,
                cvv: text,
              }))
            }
            placeholder="420"
            keyboardType="number-pad"
            maxLength={3}
            className="text-base border border-neutral-300 placeholder:text-neutral-400/60 rounded-lg px-3 py-2"
          />
        </View>
      </View>
      <Pressable
        onPress={() => {}}
        disabled={!isFormValid}
        className={`rounded-lg m-5 ${!isFormValid ? "bg-neutral-400" : "bg-purple-600"}`}
      >
        <Text className="text-center text-lg text-white font-black p-3">
          Pay ${Number(total).toFixed(2)}
        </Text>
      </Pressable>
    </>
  );
}
