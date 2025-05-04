import React from "react";
import { View, StyleSheet, ViewStyle, ViewProps } from "react-native";
import { getSpacing, marginMap, paddingMap } from "@/utils";
import { useTheme } from "react-native-paper";

interface StyleProps extends Omit<ViewStyle, "direction"> {
  direction?: "column" | "row";
  p?: number;
  px?: number;
  py?: number;
  pt?: number;
  pb?: number;
  pr?: number;
  pl?: number;
  m?: number;
  mx?: number;
  my?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  background?: string;
  color?: string;
  borderRadius?: number;
  borderWidth?: number;
  textAlign?: "center" | "left" | "right";
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
}

export interface BoxProps extends StyleProps, ViewProps {
  children?: React.ReactNode;
  boxStyle?: ViewStyle;
}

const Box: React.FC<BoxProps> = ({
  children,
  boxStyle = {},
  ...props
}: BoxProps) => {
  const theme = useTheme();
  const style = styles(theme, props);
  return children ? (
    <View style={[style.box, boxStyle]}>{children}</View>
  ) : (
    <View style={[style.box, boxStyle]} />
  );
};
export default Box;

const styles = (
  _: any,
  {
    direction,
    background,
    p,
    px,
    py,
    pt,
    pb,
    pr,
    pl,
    m,
    mr,
    ml,
    mt,
    mb,
    mx,
    my,
    gap,
    ...props
  }: StyleProps
) => {
  const allMargin: { [key: string]: number | undefined } = {
    m,
    mr,
    ml,
    mt,
    mb,
    mx,
    my,
  };

  const allPadding: { [key: string]: number | undefined } = {
    p,
    px,
    py,
    pt,
    pb,
    pr,
    pl,
  };

  const paddingObj: { [key: string]: number | string | undefined } = {};
  const marginObj: { [key: string]: number | string | undefined } = {};

  Object.keys(allPadding).forEach((key) => {
    if (allPadding[key]) {
      paddingObj[paddingMap[key]] = getSpacing(allPadding[key]);
    }
  });

  Object.keys(allMargin).forEach((key) => {
    if (allMargin[key]) {
      marginObj[marginMap[key]] = getSpacing(allMargin[key]);
    }
  });

  return StyleSheet.create({
    box: {
      ...props,
      ...paddingObj,
      ...marginObj,
      gap: getSpacing(gap),
      backgroundColor: background,
      flexDirection: direction,
    },
  });
};
