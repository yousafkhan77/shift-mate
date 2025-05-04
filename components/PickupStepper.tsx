import React from "react";
import { SafeAreaView } from "react-native";
import Box from "./Box";
import BaseButton from "./BaseButton";
import { router } from "expo-router";
import { ButtonProps, Text } from "react-native-paper";
import Button from "./Button";
import { isAndroid } from "@/utils";
import Feather from "@expo/vector-icons/Feather";
import IconButton from "./IconButton";

interface PickupStepperProps {
  title?: string;
  onContinue?: () => void;
  endButton?: React.ReactNode;
  endButtonTitle?: string;
  endButtonProps?: ButtonProps;
  children?: React.ReactNode;
}

const PickupStepper = ({
  title,
  children,
  onContinue,
  endButton,
  endButtonTitle = "Continue",
  endButtonProps,
}: PickupStepperProps) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Box
        flex={1}
        px={2.5}
        pt={isAndroid ? 28 / 4 : 2}
        pb={2.5}
        justifyContent="space-between"
      >
        <Box gap={5}>
          <Box direction="row" alignItems="center">
            <IconButton onPress={() => router.back()}>
              <Feather name="arrow-left" size={24} color="black" />
            </IconButton>
            <Box flex={1} justifyContent="center" alignItems="center">
              <Text
                variant="headlineSmall"
                style={{
                  fontFamily: "SatoshiBold",
                }}
              >
                {title}
              </Text>
            </Box>
            <Feather
              name="arrow-right"
              size={24}
              color="black"
              style={{ opacity: 0 }}
            />
          </Box>
          {children}
        </Box>
        {endButton ? (
          endButton
        ) : (
          <Button
            {...endButtonProps}
            textColor="white"
            mode="contained"
            style={{
              borderRadius: 100,
              height: 46,
              justifyContent: "center",
              minWidth: 130,
            }}
            labelStyle={{
              fontSize: 16,
              fontWeight: 700,
            }}
            onPress={onContinue}
          >
            {endButtonTitle}
          </Button>
        )}
      </Box>
    </SafeAreaView>
  );
};

export default PickupStepper;
