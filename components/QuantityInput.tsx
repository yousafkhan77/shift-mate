import React from "react";
import Box, { BoxProps } from "./Box";
import BaseButton from "./BaseButton";
import { Text, useTheme } from "react-native-paper";
import IconButton from "./IconButton";

interface QuantityInputProps {
  qty?: string | number;
  hideOnZero?: boolean;
  onDecrease: () => void;
  onIncrease: () => void;
  containerProps?: BoxProps;
}

const QuantityInput = ({
  qty,
  onIncrease,
  onDecrease,
  hideOnZero,
  containerProps,
}: QuantityInputProps) => {
  const theme = useTheme();
  return (
    <Box
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      flex={0.5}
      {...containerProps}
    >
      {!hideOnZero || (hideOnZero && qty) ? (
        <>
          <IconButton onPress={onDecrease}>
            <Box
              alignItems="center"
              justifyContent="center"
              height={30}
              width={30}
              background={(theme.colors as any).lightBlue100}
              borderRadius={8}
            >
              <Text
                variant="titleMedium"
                style={{
                  fontFamily: "SatoshiBold",
                  color: (theme.colors as any).darkBlue,
                }}
              >
                -
              </Text>
            </Box>
          </IconButton>
          <Text
            variant="titleSmall"
            style={{
              fontFamily: "SatoshiBold",
              color: (theme.colors as any).darkBlue,
            }}
          >
            {qty}
          </Text>
        </>
      ) : null}
      <IconButton onPress={onIncrease}>
        <Box
          alignItems="center"
          justifyContent="center"
          height={30}
          width={30}
          background={(theme.colors as any).lightBlue100}
          borderRadius={8}
        >
          <Text
            variant="titleMedium"
            style={{
              fontFamily: "SatoshiBold",
              color: (theme.colors as any).darkBlue,
            }}
          >
            +
          </Text>
        </Box>
      </IconButton>
    </Box>
  );
};

export default QuantityInput;
