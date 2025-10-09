import { useRequestResetMutation } from "@/api/authentication";
import AuthButton from "@/components/AuthButton";
import Box from "@/components/Box";
import { useForm } from "@/components/Form";
import TextInput from "@/components/TextInput";
import { isAndroid } from "@/utils";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView, View } from "react-native";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Yup from "yup";

const DATA = {
  email: "",
};

const SCHEMA = {
  email: Yup.string()
    .email("Email is not valid.")
    .required("Email is required."),
};

const RequestReset = () => {
  const insets = useSafeAreaInsets();
  const [requestReset, { isLoading }] = useRequestResetMutation();

  const { errors, handleChange, handleFoucs, handleSubmit } = useForm({
    initialValues: DATA,
    validationSchema: Yup.object().shape(SCHEMA),
    onSubmit: (values: any) => {
      requestReset({
        ...values,
        email: values.email.toLowerCase(),
      }).then((res: any) => {
        if (!res.error) {
          router.push({
            pathname: "/resetCode",
            params: { email: values.email.toLowerCase() },
          });
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
              Reset your password
            </Text>
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: "Satoshi",
              }}
            >
              Enter your email to receive a password reset code.
            </Text>
          </Box>
          <TextInput
            label="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={handleChange("email")}
            helperText={errors.email}
            onFocus={handleFoucs("email")}
            error={Boolean(errors.email)}
          />
        </View>
        <AuthButton onPress={handleSubmit} loading={isLoading}>
          Reset Password
        </AuthButton>
      </Box>
    </SafeAreaView>
  );
};

export default RequestReset;
