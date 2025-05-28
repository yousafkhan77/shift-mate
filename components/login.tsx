import { useLoginUserMutation } from "@/api/authentication";
import AuthButton from "@/components/AuthButton";
import Box from "@/components/Box";
import Button from "@/components/Button";
import { useForm } from "@/components/Form";
import TextInput from "@/components/TextInput";
import { updateStore } from "@/redux/slices/common";
import { useTypedDispatch } from "@/redux/store";
import { isAndroid } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { SafeAreaView, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Yup from "yup";

const DATA = {
  email: "",
  password: "",
};

const SCHEMA = {
  email: Yup.string()
    .email("Email is not valid.")
    .required("Email is required."),
  password: Yup.string().required("Password is required."),
};

const Login = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useTypedDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const { errors, handleChange, handleFoucs, handleSubmit } = useForm({
    initialValues: DATA,
    validationSchema: Yup.object().shape(SCHEMA),
    onSubmit: (values: any) => {
      loginUser({
        ...values,
        email: values.email.toLowerCase(),
      }).then((res: any) => {
        if (!res.error) {
          const {
            accessToken,
            refreshToken,
            userFields = {},
            userVehicle = {},
            ...user
          } = res.data;
          if (user.type === "driver" && user.verificationStatus === "pending") {
            AsyncStorage.setItem("access-token", accessToken);
            AsyncStorage.setItem("refresh-token", refreshToken);
            router.replace({
              pathname: "/verification",
              params: {
                ...user,
                ...userFields,
                ...userVehicle,
                accessToken,
                refreshToken,
              },
            });
          } else {
            dispatch(updateStore({ key: "user", value: user }));
            AsyncStorage.setItem("access-token", accessToken);
            AsyncStorage.setItem("refresh-token", refreshToken);
            router.replace("/(tabs)");
          }
        }
      });
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAwareScrollView>
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
                Let's get you login!
              </Text>
              <Text
                variant="bodyLarge"
                style={{
                  fontFamily: "Satoshi",
                }}
              >
                Fill in your details to login to your account.
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
              <Button
                style={{ alignSelf: "flex-end" }}
                textColor={theme.colors.primary}
                onPress={() => {
                  router.push("/(auth)");
                }}
              >
                Don't have an account? Sign up
              </Button>
            </View>
          </View>
          <AuthButton onPress={handleSubmit} loading={isLoading}>
            Login
          </AuthButton>
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;
