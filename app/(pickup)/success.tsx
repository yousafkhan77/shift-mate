import Box from "@/components/Box";
import { isAndroid } from "@/utils";
import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import LottieView from "lottie-react-native";
import { router } from "expo-router";

const Success = () => {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    setTimeout(() => {
      animationRef.current?.reset();
      animationRef.current?.play();
    }, 1);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Box
        flex={1}
        px={2.5}
        pt={isAndroid ? 28 / 8 : 2}
        pb={2.5}
        alignItems="center"
        justifyContent="center"
      >
        <LottieView
          ref={animationRef}
          style={{ height: 250, width: 250 }}
          source={require("@/assets/lottie/checkmark.json")}
          autoPlay={false}
          loop={false}
          onAnimationFinish={() => {
            setTimeout(() => {
              router.dismissTo("/(tabs)");
            }, 1000);
          }}
        />
        <Box mt={-5} gap={1} alignItems="center" justifyContent="center">
          <Text variant="titleLarge" style={{ fontFamily: "SatoshiBold" }}>
            Booking Confirmed
          </Text>
          <Text
            variant="titleMedium"
            style={{ fontFamily: "Satoshi", textAlign: "center" }}
          >
            Your booking has been confirmed, you will be returned to the main
            screen shortly.
          </Text>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default Success;
