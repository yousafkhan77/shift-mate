import { useVerifyResetMutation } from "@/api/authentication";
import AuthButton from "@/components/AuthButton";
import Box from "@/components/Box";
import { isAndroid } from "@/utils";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: dimensionWidth } = Dimensions.get("window");
const CELL_COUNT = 6;
const CELL_SIZE = (dimensionWidth - 120) / CELL_COUNT;
const CELL_BORDER_RADIUS = 8;
const DEFAULT_CELL_BG_COLOR = "#fff";
const NOT_EMPTY_CELL_BG_COLOR = "#3557b7";
const ACTIVE_CELL_BG_COLOR = "#f7fafe";

const { Value, Text: AnimatedText } = Animated;
const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }: any) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      // @ts-ignore
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const ResetCode = () => {
  const insets = useSafeAreaInsets();
  const { email } = useLocalSearchParams();
  const [code, setCode] = useState("");
  const [verifyReset, { isLoading: isVerifying }] = useVerifyResetMutation();
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const onSubmit = () => {
    if (email)
      verifyReset({ email, resetToken: code } as any).then((res: any) => {
        if (!res.error) {
          router.replace({
            pathname: "/resetPassword",
            params: {
              email,
              resetToken: code,
            },
          });
        }
      });
  };

  const renderCell = ({ index, symbol, isFocused }: any) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  useEffect(() => {
    if (code.length === 6) {
      setTimeout(onSubmit, 100);
    }
  }, [code]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Box
        flex={1}
        px={2.5}
        pt={isAndroid ? 28 / 4 : 4}
        pb={isAndroid ? insets.bottom / 6 : 2.5}
        justifyContent="space-between"
      >
        <View style={{ gap: 20 }}>
          <Box gap={0.675}>
            <Text
              variant="displaySmall"
              style={{
                fontFamily: "SatoshiBold",
              }}
            >
              Verification
            </Text>
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: "Satoshi",
              }}
            >
              Enter the 6-digit code we sent to your email address to verify
              your identity.
            </Text>
          </Box>
          <CodeField
            ref={ref}
            {...props}
            value={code}
            onChangeText={setCode}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFiledRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={renderCell}
          />
        </View>
        <AuthButton
          disabled={!code || code.length < 6}
          onPress={onSubmit}
          loading={isVerifying}
        >
          Verify
        </AuthButton>
      </Box>
    </SafeAreaView>
  );
};

export default ResetCode;

const styles = StyleSheet.create({
  codeFiledRoot: {
    height: CELL_SIZE,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    fontSize: 30,
    textAlign: "center",
    borderRadius: CELL_BORDER_RADIUS,
    color: "#3759b8",
    backgroundColor: "#fff",

    // IOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },
});
