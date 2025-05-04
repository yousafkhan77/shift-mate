import Box from "@/components/Box";
import React from "react";
import { Platform, SafeAreaView } from "react-native";
import { Text } from "react-native-paper";

const Bookings = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Box flex={1} pt={Platform.select({ ios: 2, android: 5.5 })} gap={2.5}>
        <Box px={2.5}>
          <Text variant="titleLarge" style={{ fontFamily: "SatoshiBold" }}>
            Bookings
          </Text>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default Bookings;
