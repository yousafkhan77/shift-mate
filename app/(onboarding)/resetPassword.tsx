import { useResetPasswordMutation } from "@/api/authentication";
import AuthButton from "@/components/AuthButton";
import Box from "@/components/Box";
import { useForm } from "@/components/Form";
import TextInput from "@/components/TextInput";
import { isAndroid } from "@/utils";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView, View } from "react-native";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

const DATA = {
  password: "",
  confirmPassword: "",
};

const SCHEMA = {
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match.")
    .required("Please confirm your password."),
};

const ResetPassword = () => {
  const insets = useSafeAreaInsets();
  const { email, resetToken } = useLocalSearchParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const { errors, handleChange, handleFoucs, handleSubmit } = useForm({
    initialValues: DATA,
    validationSchema: Yup.object().shape(SCHEMA),
    onSubmit: (values: any) => {
      resetPassword({
        ...values,
        email,
        resetToken,
      }).then((res: any) => {
        if (!res.error) {
          Toast.show({ type: "success", text1: res.data.message });
          router.replace("/login");
        }
      });
    },
  });

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
              Set a new password
            </Text>
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: "Satoshi",
              }}
            >
              Enter and confirm your new password to continue.
            </Text>
          </Box>
          <View style={{ gap: 10 }}>
            <TextInput
              label="Password"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={handleChange("password")}
              helperText={errors.password}
              error={Boolean(errors.password)}
              onFocus={handleFoucs("password")}
            />
            <TextInput
              label="Confirm Password"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={handleChange("confirmPassword")}
              helperText={errors.confirmPassword}
              error={Boolean(errors.confirmPassword)}
              onFocus={handleFoucs("confirmPassword")}
            />
          </View>
        </View>
        <AuthButton onPress={handleSubmit} loading={isLoading}>
          Reset
        </AuthButton>
      </Box>
    </SafeAreaView>
  );
};

export default ResetPassword;
