import { useSignIn } from "@clerk/expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, SignInSchema_T } from "@repo/types";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function SignInScreen() {
  const { signIn, fetchStatus } = useSignIn();
  const router = useRouter();
  const isLoading = fetchStatus === "fetching";

  const [clerkError, setClerkError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<SignInSchema_T>({
    resolver: zodResolver(SignInSchema),
  });

  const onSignInPress = async (values: SignInSchema_T) => {
    const { error } = await signIn.password({
      emailAddress: values.email,
      password: values.password,
    });

    if (error) {
      setClerkError(error.message);
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session.currentTask) return;
          const url = decorateUrl("/");
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
          <Text className="text-3xl font-bold">Welcome back</Text>
          <Text className="text-neutral-500">
            Explore the world's best experiences
          </Text>
        </View>
        {/*  */}
        <View className="gap-3 mb-8">
          <View>
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => {
                return (
                  <TextInput
                    className="border border-neutral-300 px-5 rounded-lg placeholder:text-neutral-400"
                    placeholder="Email"
                    value={value}
                    onChangeText={onChange}
                  />
                );
              }}
            />
            {formErrors.email && (
              <Text className="text-red-500">{formErrors.email?.message}</Text>
            )}
          </View>
          <View>
            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange } }) => {
                return (
                  <TextInput
                    className="border border-neutral-300 px-5 rounded-lg placeholder:text-neutral-400"
                    placeholder="Password"
                    secureTextEntry
                    value={value}
                    onChangeText={onChange}
                  />
                );
              }}
            />
            {formErrors.password && (
              <Text className="text-red-500">
                {formErrors.password.message}
              </Text>
            )}
            {clerkError && <Text className="text-red-500">{clerkError}</Text>}
          </View>
        </View>
        {/*  */}
        <TouchableOpacity
          className="bg-blue-500 py-3 rounded-lg mb-4"
          onPress={handleSubmit(onSignInPress)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-semibold">
              Sign In
            </Text>
          )}
        </TouchableOpacity>
        {/*  */}
        <View className="flex-row justify-center">
          <Text className="text-neutral-500">
            Don't have an account?{" "}
            <Link href="/sign-up">
              <Text className="text-blue-500">Sign Up</Text>
            </Link>
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
