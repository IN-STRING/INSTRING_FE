import { Tabs } from "expo-router";
import React from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.background,
          height: 89,
          paddingBottom: 10,
          paddingTop: 17,
          margin: 0,
          borderTopWidth: 1,
          borderTopColor: Colors.white,
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#ffffff",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "검색",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="recordings"
        options={{
          title: "내 녹음",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "archive" : "archive-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          title: "마이페이지",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
