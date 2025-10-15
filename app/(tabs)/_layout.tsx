import { Tabs, usePathname } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function TabLayout() {
  const pathname = usePathname();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#827D88",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          display:
            pathname?.startsWith("/movies/") && pathname !== "/movies"
              ? "none"
              : "flex",
          backgroundColor: "#2E2739",
          borderTopLeftRadius: 27,
          borderTopRightRadius: 27,
          elevation: 0,
          height: 75,
        },
      }}
    >
      <Tabs.Screen
        name="movies"
        options={{
          title: "Watch",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Watch",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mediaLibrary"
        options={{
          title: "Media library",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
