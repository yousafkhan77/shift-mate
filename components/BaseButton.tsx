import React from "react";
import {
  View,
  ViewStyle,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from "react-native";

export interface BaseButtonProps extends TouchableWithoutFeedbackProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}

const BaseButton = ({
  children,
  onPress,
  style,
  disabled,
  hitSlop,
}: BaseButtonProps) => {
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      disabled={disabled}
      hitSlop={hitSlop}
    >
      <View style={style}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default BaseButton;
