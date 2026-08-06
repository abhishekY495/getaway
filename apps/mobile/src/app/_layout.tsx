import "../../global.css";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { StatusBar } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

const client = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={client}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <KeyboardProvider>
          <SafeAreaView className="bg-white flex-1">
            <StatusBar barStyle={"dark-content"} />
            <Slot />
          </SafeAreaView>
        </KeyboardProvider>
      </ClerkProvider>
    </QueryClientProvider>
  );
}
