import Box from "@/components/Box";
import Button from "@/components/Button";
import { isAndroid } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, Image, View } from "react-native";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const pages = [
  {
    id: 3,
    image: require("@/assets/images/XQ.png"),
    title: "Safe and Reliable Delivery",
  },
];

const SharedStyles: any = {
  height: 48,
  justifyContent: "center",
  flex: 1,
};

export default function Onboarding() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <Box
      flex={1}
      background="white"
      pt={safeAreaInsets.top / 8 + 1.25}
      pb={safeAreaInsets.bottom / (isAndroid ? 6 : 6.5)}
    >
      <StatusBar style="light" />
      <Box alignSelf="center">
        <Text variant="displaySmall" style={{ fontFamily: "SatoshiBlack" }}>
          ShiftMate
        </Text>
      </Box>
      {pages.map((page) => (
        <View
          key={page.id}
          style={{
            flex: 1,
            width: width,
            justifyContent: "center",
          }}
        >
          <Box gap={2.5} alignItems="center" justifyContent="center" px={2.5}>
            <Image
              style={{ width: 330, height: 330 }}
              resizeMode="contain"
              source={page.image}
            />
            <Text
              variant="displaySmall"
              style={{
                fontFamily: "SatoshiBold",
                textAlign: "center",
              }}
            >
              {page.title}
            </Text>
          </Box>
        </View>
      ))}
      <Box
        direction="row"
        px={2.5}
        alignItems="center"
        gap={2.5}
        justifyContent="space-between"
      >
        <Button
          textColor="black"
          mode="outlined"
          style={SharedStyles}
          onPress={() => {
            AsyncStorage.setItem("onboarding-completed", "true");
            router.replace("/(auth)/login");
          }}
          labelStyle={{
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          Login
        </Button>
        <Button
          textColor="white"
          mode="contained"
          style={SharedStyles}
          onPress={() => {
            AsyncStorage.setItem("onboarding-completed", "true");
            router.replace("/(auth)/register");
          }}
          labelStyle={{
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}
