import BaseButton from "@/components/BaseButton";
import Box from "@/components/Box";
import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Platform, SafeAreaView } from "react-native";
import { Text, useTheme } from "react-native-paper";

const UserItems = [
  { label: "Bookings", value: "bookings" },
  { label: "Addresses", value: "addresses" },
];

const Account = () => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Box flex={1} pt={Platform.select({ ios: 2, android: 5.5 })} gap={2.5}>
        <Box px={2.5}>
          <Text variant="titleLarge" style={{ fontFamily: "SatoshiBold" }}>
            Account
          </Text>
        </Box>
        <Box
          gap={3.5}
          borderTopWidth={1}
          borderTopColor={(theme.colors as any).borderGrey}
          px={2.5}
          py={2.5}
          background={(theme.colors as any).lightGrey}
        >
          <Box gap={1}>
            <Text variant="titleLarge" style={{ fontFamily: "SatoshiBold" }}>
              John Doe
            </Text>
            <IconButton onPress={() => router.push("/profile")}>
              <Text variant="titleSmall" style={{ fontFamily: "SatoshiBold" }}>
                View profile
              </Text>
            </IconButton>
          </Box>
          <Box
            direction="row"
            alignItems="center"
            gap={3}
            justifyContent="space-between"
          >
            {UserItems.map((userItem) => (
              <BaseButton
                key={userItem.value}
                style={{ flex: 1 }}
                onPress={() => {
                  if (userItem.value === "bookings") router.push("/bookings");
                }}
              >
                <Box
                  alignItems="center"
                  justifyContent="center"
                  p={1.5}
                  gap={0.25}
                  borderWidth={1}
                  borderRadius={8}
                  background={(theme.colors as any).white}
                  borderColor={(theme.colors as any).borderGrey}
                >
                  {userItem.value === "bookings" ? (
                    <MaterialCommunityIcons
                      name="package-variant-closed"
                      size={26}
                      color="black"
                    />
                  ) : (
                    <Octicons name="location" size={20} color="black" />
                  )}
                  <Text variant="titleMedium" style={{ fontFamily: "Satoshi" }}>
                    {userItem.label}
                  </Text>
                </Box>
              </BaseButton>
            ))}
          </Box>
        </Box>
        {/* <Box
          px={2.5}
          py={3}
          gap={2}
          background={(theme.colors as any).white}
        ></Box> */}
        <Box
          flex={1}
          justifyContent="flex-end"
          px={2.5}
          pb={Platform.select({ ios: 3, android: 2.25 })}
          gap={2}
          background={(theme.colors as any).white}
        >
          <Button mode="outlined" textColor={(theme.colors as any).black}>
            Log out
          </Button>
          <Text
            variant="titleSmall"
            style={{
              fontFamily: "Satoshi",
              textAlign: "center",
              color: (theme.colors as any).iconGrey,
            }}
          >
            Version 1.0.0
          </Text>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default Account;
