import { useAuth, useSignUp } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, SignUpSchema_T } from "@repo/types";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function SignUpScreen() {
  const { signUp, fetchStatus } = useSignUp();
  const router = useRouter();
  const isLoading = fetchStatus === "fetching";

  const [clerkError, setClerkError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<SignUpSchema_T>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSignUpPress = async (values: SignUpSchema_T) => {
    const { error } = await signUp.password({
      firstName: values.firstName,
      lastName: values.lastName,
      emailAddress: values.email,
      password: values.password,
    });

    if (error) {
      setClerkError(error.message);
      return;
    }

    await signUp.verifications.sendEmailCode();
    router.push({
      pathname: "/verify-email",
      params: { email: values.email },
    });
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
          <Text className="text-3xl font-bold">Create account</Text>
          <Text className="text-neutral-500">
            Explore the world's best experiences
          </Text>
        </View>
        {/*  */}
        <View className="gap-3 mb-8">
          <View>
            <View className="flex-row gap-3">
              <Controller
                control={control}
                name="firstName"
                render={({ field: { value, onChange } }) => {
                  return (
                    <TextInput
                      className="flex-1 border border-neutral-300 px-5 rounded-lg placeholder:text-neutral-400"
                      placeholder="First name"
                      value={value}
                      onChangeText={onChange}
                    />
                  );
                }}
              />
              <Controller
                control={control}
                name="lastName"
                render={({ field: { value, onChange } }) => {
                  return (
                    <TextInput
                      className="flex-1 border border-neutral-300 px-5 rounded-lg placeholder:text-neutral-400"
                      placeholder="Last name"
                      value={value}
                      onChangeText={onChange}
                    />
                  );
                }}
              />
            </View>
            {(formErrors.firstName || formErrors.lastName) && (
              <Text className="text-red-500">
                {formErrors.firstName?.message || formErrors.lastName?.message}
              </Text>
            )}
          </View>
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
          onPress={handleSubmit(onSignUpPress)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-semibold">
              Sign Up
            </Text>
          )}
        </TouchableOpacity>
        {/*  */}
        <View className="flex-row justify-center">
          <Text className="text-neutral-500">
            Already have an account?{" "}
            <Link href="/sign-in">
              <Text className="text-blue-500">Sign In</Text>
            </Link>
          </Text>
        </View>
        {/*  */}
        <View nativeID="clerk-captcha" />
      </View>
    </KeyboardAwareScrollView>
  );
}
