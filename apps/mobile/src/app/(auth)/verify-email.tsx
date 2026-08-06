import { useSignUp } from "@clerk/expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { CodeSchema, CodeSchema_T } from "@repo/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function VerifyEmail() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [clerkError, setClerkError] = useState("");
  const { signUp, fetchStatus } = useSignUp();
  const router = useRouter();

  const isLoading = fetchStatus === "fetching";

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<CodeSchema_T>({
    resolver: zodResolver(CodeSchema),
  });

  const onVerifyPress = async (values: CodeSchema_T) => {
    const { error } = await signUp.verifications.verifyEmailCode({
      code: values.code,
    });

    if (error) {
      setClerkError(error.message);
      return;
    }

    if (signUp.status === "complete") {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session.currentTask) return;
          const url = decorateUrl("/setup-account");
          router.replace(url as any);
        },
      });
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 justify-center p-8 bg-white">
        <Image
          source={require("../../../assets/app-icon.png")}
          className="w-60 h-60 rounded-lg self-center mb-10"
          resizeMode="cover"
        />
        {/*  */}
        <View className="mb-8">
          <Text className="text-3xl font-bold">Verify your account</Text>
          <Text className="text-neutral-500">We sent a code to {email}</Text>
        </View>
        {/*  */}
        <View className="mb-4">
          <Controller
            control={control}
            name="code"
            render={({ field: { value, onChange } }) => {
              return (
                <TextInput
                  className="border border-neutral-300 px-5 rounded-lg placeholder:text-neutral-400"
                  placeholder="Code"
                  value={value}
                  onChangeText={onChange}
                />
              );
            }}
          />
          {formErrors.code && (
            <Text className="text-red-500">{formErrors.code?.message}</Text>
          )}
          {clerkError && <Text className="text-red-500">{clerkError}</Text>}
        </View>
        {/*  */}
        <TouchableOpacity
          className="bg-blue-500 py-3 rounded-lg mb-4"
          onPress={handleSubmit(onVerifyPress)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-semibold">Verify</Text>
          )}
        </TouchableOpacity>
        {/*  */}
        <TouchableOpacity
          onPress={() => signUp.verifications.sendEmailCode()}
          className="py-2"
        >
          <Text className="text-blue-500 text-sm">I need a new code</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            signUp.reset();
            router.back();
          }}
          className="py-2"
        >
          <Text className="text-blue-500 text-sm">Go back</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
