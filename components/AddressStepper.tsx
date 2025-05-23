import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Text, TextProps } from "react-native-paper";
import Box from "./Box";

const AddressStepper = ({
  pickup,
  dropoff,
  textProps,
}: {
  textProps?: Omit<TextProps<any>, "children">;
  pickup: string;
  dropoff: string;
}) => {
  return (
    <>
      <Box gap={1.25} direction="row" alignItems="center" pr={3}>
        <FontAwesome6 name="location-dot" size={22} color="green" />
        <Text style={{ fontFamily: "Satoshi" }} {...textProps}>
          {pickup}
        </Text>
      </Box>
      <Box height={10} width={1} ml={0.75} my={-1} background="black" />
      <Box gap={1.25} direction="row" alignItems="center" pr={3}>
        <FontAwesome6 name="location-dot" size={22} color="red" />
        <Text style={{ fontFamily: "Satoshi" }} {...textProps}>
          {dropoff}
        </Text>
      </Box>
    </>
  );
};

export default AddressStepper;
