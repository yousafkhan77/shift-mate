import { isAndroid } from "@/utils";
import React from "react";
import {
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  ScrollView,
} from "react-native";
import ConditionalScrollView from "./ConditionalScrollView";

const KeyboardAvoidingView = ({
  children,
  withoutScrollView,
  ...props
}: KeyboardAvoidingViewProps & { withoutScrollView?: boolean }) => {
  return (
    <RNKeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={40}
      behavior={isAndroid ? undefined : "padding"}
      {...props}
    >
      {withoutScrollView ? (
        children
      ) : (
        <ConditionalScrollView showsVerticalScrollIndicator={false}>
          {children}
        </ConditionalScrollView>
      )}
    </RNKeyboardAvoidingView>
  );
};

export default KeyboardAvoidingView;
