import React, { forwardRef } from "react";
import { ActionSheetRef } from "react-native-actions-sheet";
import { Text, useTheme } from "react-native-paper";
import Box from "./Box";
import BottomSheet from "./BottomSheet";
import { Image, Platform } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { capitalize } from "@/utils";
import BaseButton from "./BaseButton";
import { router } from "expo-router";

interface LocationChoiceActionSheetProps {
  type?: string;
}

const LoactionOptions = [
  {
    label: "Within City",
    value: "within-city",
    description: "within city.",
  },
  {
    label: "Other City",
    value: "other-city",
    description: "to other city.",
  },
];

const LocationChoiceActionSheet = forwardRef<
  ActionSheetRef,
  LocationChoiceActionSheetProps
>(({ type }, ref) => {
  const theme = useTheme();
  return (
    <BottomSheet ref={ref} initialSnapIndex={1} snapPoints={[100, 100]}>
      <Box px={3} pb={Platform.select({ android: 4, ios: 5.5 })} pt={1} gap={2}>
        <Text style={{ fontSize: 20, fontFamily: "SatoshiBold" }}>
          {capitalize(type)} for
        </Text>
        {LoactionOptions.map((lop) => (
          <BaseButton
            key={lop.value}
            onPress={() => {
              (ref as any)?.current?.hide();
              router.push({
                pathname: "/(pickup)",
                params: { type, locationType: lop.value },
              });
            }}
          >
            <Box
              borderRadius={14}
              px={2}
              direction="row"
              alignItems="center"
              gap={2}
              justifyContent="space-between"
              background={(theme.colors as any).lightBlue}
            >
              <Box flex={1} direction="row" alignItems="center" gap={3}>
                <Image
                  resizeMode="contain"
                  style={{ width: 85, height: 85 }}
                  source={require("@/assets/images/3V1.png")}
                />
                <Box flex={1}>
                  <Text
                    variant="titleMedium"
                    style={{
                      fontFamily: "SatoshiBold",
                    }}
                  >
                    {lop.label}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Satoshi",
                    }}
                  >
                    {capitalize(type)} {lop.description}
                  </Text>
                </Box>
              </Box>
              <Feather
                name="chevron-right"
                size={24}
                color={theme.colors.primary}
              />
            </Box>
          </BaseButton>
        ))}
      </Box>
    </BottomSheet>
  );
});

export default LocationChoiceActionSheet;
