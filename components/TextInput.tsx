import { getSpacing } from "@/utils";
import React, { forwardRef } from "react";
import {
  TextInput as Input,
  View,
  StyleSheet,
  TextInputProps,
  StyleProp,
  TextStyle,
  Animated,
} from "react-native";
import { Text, useTheme } from "react-native-paper";

export interface TextInputInterface extends TextInputProps {
  label?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  error?: boolean;
  helperText?: any;
  isAnimated?: boolean;
  inputStyle?: StyleProp<TextStyle>;
}

const TextInput = forwardRef(
  (
    {
      label,
      left,
      right,
      error,
      helperText,
      inputStyle,
      isAnimated,
      ...props
    }: TextInputInterface,
    ref: any
  ) => {
    const theme = useTheme();
    const style = styles(theme);
    return (
      <View>
        <View style={style.container}>
          {label && (
            <Text
              style={[
                style.text,
                {
                  color:
                    error && helperText
                      ? theme.colors.error
                      : (theme.colors as any).black,
                },
              ]}
            >
              {label}
            </Text>
          )}
          {isAnimated ? (
            <Animated.View
              style={[
                {
                  ...style.textContainer,
                  justifyContent: right ? "space-between" : "flex-start",
                },
                props.style as any,
              ]}
            >
              {left}
              <Input
                placeholderTextColor={(theme.colors as any).iconGrey}
                {...props}
                ref={ref}
                style={[{ ...style.input }, inputStyle]}
              />
              {right}
            </Animated.View>
          ) : (
            <View
              style={[
                {
                  ...style.textContainer,
                  justifyContent: right ? "space-between" : "flex-start",
                },
                props.style as any,
              ]}
            >
              {left}
              <Input
                placeholderTextColor="#9b9b9b"
                {...props}
                keyboardAppearance="light"
                ref={ref}
                style={[{ ...style.input }, inputStyle]}
              />
              {right}
            </View>
          )}
        </View>
        {error && helperText && (
          <Text
            variant="titleSmall"
            style={{ color: theme.colors.error, marginLeft: 5, marginTop: 5 }}
          >
            {helperText}
          </Text>
        )}
      </View>
    );
  }
);
export default TextInput;

const styles = (theme: any) =>
  StyleSheet.create({
    lowMargin: {
      marginTop: 10,
    },
    rightIcon: {
      paddingLeft: getSpacing(1.25) as any,
    },
    textContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.white,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: theme.colors.inputBorder,
      borderRadius: 6,
    },
    container: {
      width: "100%",
    },
    input: {
      fontSize: 15,
      height: 42,
      flex: 1,
      padding: 12,
      color: theme.colors.black,
    },
    text: {
      lineHeight: 20,
      fontFamily: "SatoshiBold",
      marginBottom: 6,
      fontSize: 14,
    },
  });
