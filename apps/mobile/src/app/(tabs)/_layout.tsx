import { Tabs } from "expo-router";
import { CompassIcon, HomeIcon, UserIcon } from "lucide-react-native";

export default function TabsLayout() {
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
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <HomeIcon color={color} size={size} strokeWidth={focused ? 3 : 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
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
