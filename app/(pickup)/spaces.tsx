import React, { useState } from "react";
import Box from "@/components/Box";
import PickupStepper from "@/components/PickupStepper";
import { Text, useTheme } from "react-native-paper";
import { Image, ScrollView } from "react-native";
import BaseButton from "@/components/BaseButton";
import Octicons from "@expo/vector-icons/Octicons";
import { router, useLocalSearchParams } from "expo-router";
import { SpaceOptions } from "@/utils";

const Spaces = () => {
  const theme = useTheme();
  const searchParams = useLocalSearchParams();
  const [selectedSpaces, setSelectedSpaces] = useState<string[]>([]);
  return (
    <PickupStepper
      title="Spaces"
      onContinue={() => {
        router.push({
          pathname: "/costEstimation",
          params: {
            ...searchParams,
            spaces: selectedSpaces.join(","),
          },
        });
      }}
      endButtonProps={{ disabled: selectedSpaces.length === 0 } as any}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box gap={3}>
          <Text variant="titleMedium" style={{ fontFamily: "Satoshi" }}>
            Select the spaces you need to move for a customized relocation plan.
          </Text>
          {SpaceOptions.map((spaceOption) => (
            <BaseButton
              key={spaceOption.value}
              onPress={() => {
                if (selectedSpaces.includes(spaceOption.value)) {
                  setSelectedSpaces(
                    selectedSpaces.filter((ss) => ss !== spaceOption.value)
                  );
                } else {
                  setSelectedSpaces([...selectedSpaces, spaceOption.value]);
                }
              }}
            >
              <Box
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                px={2}
                py={1.25}
                borderWidth={1}
                borderColor={
                  selectedSpaces.includes(spaceOption.value)
                    ? theme.colors.primary
                    : (theme.colors as any).lightGrey
                }
                background={
                  selectedSpaces.includes(spaceOption.value)
                    ? (theme.colors as any).lightBlue100
                    : (theme.colors as any).lightGrey
                }
                borderRadius={4}
              >
                <Box direction="row" alignItems="center" gap={2}>
                  <Image
                    source={spaceOption.image}
                    resizeMode="contain"
                    style={{ height: 55, width: 55 }}
                  />
                  <Text
                    variant="titleMedium"
                    style={{
                      fontFamily: "SatoshiBold",
                      color: (theme.colors as any).darkBlue,
                    }}
                  >
                    {spaceOption.label}
                  </Text>
                </Box>
                {selectedSpaces.includes(spaceOption.value) && (
                  <Octicons
                    name="check-circle-fill"
                    size={22}
                    color={theme.colors.primary}
                  />
                )}
              </Box>
            </BaseButton>
          ))}
        </Box>
      </ScrollView>
    </PickupStepper>
  );
};

export default Spaces;
