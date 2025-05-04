import React from "react";
import Box from "./Box";
import { useTheme } from "react-native-paper";
import BaseButton from "./BaseButton";

interface RadioProps {
  selected?: boolean;
  circleSize?: number;
}

function RadioButton({ circleSize = 10, selected }: RadioProps) {
  const theme = useTheme();
  return (
    <Box
      borderWidth={2}
      borderRadius={10000}
      alignItems="center"
      justifyContent="center"
      background={
        selected ? theme.colors.primary : (theme.colors as any).grey600
      }
      borderColor={
        selected ? theme.colors.primary : (theme.colors as any).grey600
      }
      width={circleSize + 8}
      height={circleSize + 8}
    >
      <Box
        width={circleSize - 2}
        height={circleSize - 2}
        background={(theme.colors as any).white}
        borderRadius={50}
      />
    </Box>
  );
}

export default RadioButton;
