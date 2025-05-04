import { Tabs } from "expo-router";
import React from "react";
// import { IconSymbol } from "@/components/IconSymbol";
// import TabBar from "@/components/TabBar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Platform } from "react-native";

export default function TabLayout() {
  const theme = useTheme();
  return (
    <Tabs
      // tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      safeAreaInsets={Platform.select({
        ios: undefined,
        android: { bottom: 16 },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarActiveTintColor: theme.colors.primary,
          tabBarLabelStyle: { fontSize: 11, fontFamily: "SatoshiBold" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="home-variant"
                size={26}
                color={theme.colors.primary}
              />
            ) : (
              <MaterialCommunityIcons
                name="home-variant-outline"
                size={26}
                color="black"
              />
            ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "Bookings",
          tabBarActiveTintColor: theme.colors.primary,
          tabBarLabelStyle: { fontSize: 11, fontFamily: "SatoshiBold" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="package-variant"
                size={26}
                color={theme.colors.primary}
              />
            ) : (
              <MaterialCommunityIcons
                name="package-variant-closed"
                size={26}
                color="black"
              />
            ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarActiveTintColor: theme.colors.primary,
          tabBarLabelStyle: { fontSize: 11, fontFamily: "SatoshiBold" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome5
                name="user-alt"
                size={21}
                color={theme.colors.primary}
              />
            ) : (
              <FontAwesome5 name="user" size={21} color="black" />
            ),
        }}
      />
    </Tabs>
  );
}
