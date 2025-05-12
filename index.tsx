import { useGetDefaultAddressQuery } from "@/api";
import AddressActionSheet from "@/components/AddressActionSheet";
import BaseButton from "@/components/BaseButton";
import Box from "@/components/Box";
import IconButton from "@/components/IconButton";
import LocationChoiceActionSheet from "@/components/LocationChoiceActionSheet";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Image, Platform, ScrollView } from "react-native";
import { ActionSheetRef } from "react-native-actions-sheet";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

function Home() {
  const theme = useTheme();
  const [type, setType] = useState("");
  const { data: defaultAddress } = useGetDefaultAddressQuery(undefined);
  const addressSheetRef = useRef<ActionSheetRef>(null);
  const locationSheetRef = useRef<ActionSheetRef>(null);

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Box flex={1} px={2.5} pt={2}>
            <Box
              flex={1}
              direction="row"
              alignItems="center"
              gap={6}
              justifyContent="space-between"
            >
              <IconButton
                style={{ flex: 1 }}
                onPress={() => addressSheetRef.current?.show()}
              >
                <Box direction="row" alignItems="center" gap={2}>
                  <FontAwesome6
                    name="location-dot"
                    size={25}
                    color={theme.colors.primary}
                  />
                  <Box>
                    <Text
                      variant="titleMedium"
                      style={{ fontFamily: "SatoshiBold" }}
                    >
                      {defaultAddress ? "Current Address" : "Add Address"}
                    </Text>
                    {defaultAddress && (
                      <Text
                        variant="titleSmall"
                        numberOfLines={1}
                        style={{ fontFamily: "Satoshi" }}
                      >
                        {defaultAddress.address}
                      </Text>
                    )}
                  </Box>
                </Box>
              </IconButton>
              <BaseButton onPress={() => router.push("/profile")}>
                <Box mt={Platform.select({ android: -1, ios: -2 })}>
                  <FontAwesome6 name="circle-user" size={26} color="black" />
                </Box>
              </BaseButton>
            </Box>
            <BaseButton
              onPress={() => {
                setType("relocation");
                locationSheetRef.current?.show();
              }}
            >
              <Image
                resizeMode="contain"
                style={{
                  width: "100%",
                  marginTop: Platform.select({ android: -14, ios: 0 }),
                }}
                source={require("@/assets/images/DN.png")}
              />
            </BaseButton>
            <BaseButton
              onPress={() => {
                setType("relocation");
                locationSheetRef.current?.show();
              }}
            >
              <Box
                mt={Platform.select({ android: -2.5, ios: 0 })}
                flex={1}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                background={(theme.colors as any).skyBlue}
                borderRadius={15}
                p={3}
                minHeight={120}
              >
                <Box flex={1} gap={1.675}>
                  <Text
                    variant="titleLarge"
                    style={{
                      fontFamily: "SatoshiBlack",
                      color: (theme.colors as any).darkBlue,
                    }}
                  >
                    Moving/Relocation
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                      fontFamily: "Satoshi",
                      lineHeight: 18,
                      width: "85%",
                    }}
                  >
                    All in one service that includes packing, labor &
                    transportation.
                  </Text>
                </Box>
                <Image source={require("@/assets/images/-B.png")} />
              </Box>
            </BaseButton>
            <BaseButton
              onPress={() => {
                setType("delivery");
                locationSheetRef.current?.show();
              }}
            >
              <Box mt={4} flex={1} gap={3} position="relative">
                <Box
                  position="absolute"
                  left={0}
                  top={0}
                  borderRadius={15}
                  width="100%"
                  height={170}
                  background={(theme.colors as any).skyBlue}
                />
                <Image
                  resizeMode="contain"
                  style={{
                    height: 180,
                    width: Platform.select({ android: "70%", ios: "85%" }),
                    position: "relative",
                    right: -155,
                    top: -10,
                  }}
                  source={require("@/assets/images/N-b.png")}
                />
                <Box flex={1} gap={2} position="absolute" top={28} left={25}>
                  <Text
                    variant="titleLarge"
                    style={{
                      fontFamily: "SatoshiBlack",
                      color: (theme.colors as any).darkBlue,
                    }}
                  >
                    Deliveries
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                      fontFamily: "Satoshi",
                      lineHeight: 18,
                      width: "62%",
                    }}
                  >
                    Deliver anything, big or small, quickly and reliably.
                  </Text>
                </Box>
              </Box>
            </BaseButton>
          </Box>
        </ScrollView>
      </SafeAreaView>
      <AddressActionSheet
        ref={addressSheetRef}
        defaultAddress={defaultAddress}
      />
      <LocationChoiceActionSheet type={type} ref={locationSheetRef} />
    </>
  );
}

export default Home;
