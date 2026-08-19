import { registerForPushNotifications } from "@/lib/notifications";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { useAddExpoPushToken } from "@/lib/hooks/user/use-add-expo-push-token";
import { Tabs } from "expo-router";
import {
  BotIcon,
  CompassIcon,
  TicketIcon,
  UserIcon,
} from "lucide-react-native";

export default function TabsLayout() {
  const { mutate } = useAddExpoPushToken();

  useEffect(() => {
    registerForPushNotifications()
      .then((token) => {
        mutate({ expoPushToken: token });
      })
      .catch((error) => {
        console.error("Notification save failed:", error);
      });
  }, []);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: "#b0b0b0",
          elevation: 0,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size, focused }) => (
            <CompassIcon
              color={color}
              size={size}
              strokeWidth={focused ? 3 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "Bookings",
          tabBarIcon: ({ color, size, focused }) => (
            <TicketIcon
              color={color}
              size={size}
              strokeWidth={focused ? 3 : 2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ai-chat"
        options={{
          title: "AI Chat",
          tabBarIcon: ({ color, size, focused }) => (
            <BotIcon color={color} size={size} strokeWidth={focused ? 3 : 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <UserIcon color={color} size={size} strokeWidth={focused ? 3 : 2} />
          ),
        }}
      />
    </Tabs>
  );
}
