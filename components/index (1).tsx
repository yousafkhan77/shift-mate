import {
  useEmailCheckMutation,
  useRegisterUserMutation,
} from "@/api/authentication";
import AuthButton from "@/components/AuthButton";
import BaseButton from "@/components/BaseButton";
import Box from "@/components/Box";
import Button from "@/components/Button";
import { useForm } from "@/components/Form";
import OptionsBottomSheet from "@/components/OptionsBottomSheet";
import TextInput from "@/components/TextInput";
import { updateStore } from "@/redux/slices/common";
import { useTypedDispatch } from "@/redux/store";
import { isAndroid } from "@/utils";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useRef } from "react";
import { SafeAreaView, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Text, useTheme } from "react-native-paper";
import * as Yup from "yup";
import { AppTheme } from "../_layout";

const DATA = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
  type: "user",
};

const SCHEMA = {
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  email: Yup.string()
    .email("Email is not valid.")
    .required("Email is required."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required."),
  phone: Yup.string().required("Mobile number is required."),
  type: Yup.string().required("Account type is required"),
};

const ACCOUNT_TYPES = [
  { label: "User", value: "user" },
  { label: "Driver", value: "driver" },
];

const OnboardingRegister = () => {
  const theme = useTheme<AppTheme>();
  const ref = useRef<any>(null);
  const dispatch = useTypedDispatch();
  const [emailCheck, { isLoading: isCheckingEmail }] = useEmailCheckMutation();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const {
    errors,
    handleChange,
    handleFoucs,
    handleSubmit,
    values,
    setFieldValue,
  } = useForm({
    initialValues: DATA,
    validationSchema: Yup.object().shape(SCHEMA),
    onSubmit: (values: any) => {
      emailCheck({ email: values.email.toLowerCase() }).then(
        (emailRes: any) => {
          if (!emailRes.error) {
            registerUser({
              ...values,
              phone: "+92" + values.phone.replace(/\s+/g, ""),
              email: values.email.toLowerCase(),
            }).then((res: any) => {
              if (!res.error) {
                const { accessToken, refreshToken, ...user } = res.data;
                if (user.type === "driver") {
                  AsyncStorage.setItem("access-token", accessToken);
                  AsyncStorage.setItem("refresh-token", refreshToken);
                  router.replace({
                    pathname: "/verification",
                    params: {
                      ...user,
                      accessToken,
                      refreshToken,
                      type: user.type,
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
          }
        }
      );
    },
  });

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          bottomOffset={62}
        >
          <Box
            flex={1}
            px={3}
            gap={3}
            pt={isAndroid ? 28 / 4 : 4}
            justifyContent="space-between"
          >
            <Box gap={2.5}>
              <Box gap={0.675}>
                <Text
                  variant="displaySmall"
                  style={{
                    fontFamily: "SatoshiBold",
                  }}
                >
                  Let's get started!
                </Text>
                <Text
                  variant="bodyLarge"
                  style={{
                    fontFamily: "Satoshi",
                  }}
                >
                  Fill in your details to setup your account.
                </Text>
              </Box>
              <BaseButton
                onPress={() => {
                  if (ref.current) ref.current.show();
                }}
              >
                <View style={{ pointerEvents: "none" }}>
                  <TextInput
                    label="Account Type"
                    value={
                      ACCOUNT_TYPES.find((at) => at.value === values.type)
                        ?.label
                    }
                    right={
                      <Box pr={1.25}>
                        <MaterialIcons
                          name="unfold-more"
                          size={20}
                          color="black"
                        />
                      </Box>
                    }
                    helperText={errors.type}
                    error={Boolean(errors.type)}
                    onFocus={handleFoucs("type")}
                  />
                </View>
              </BaseButton>
              <TextInput
                label="First Name"
                onChangeText={handleChange("firstName")}
                helperText={errors.firstName}
                error={Boolean(errors.firstName)}
                onFocus={handleFoucs("firstName")}
              />
              <TextInput
                label="Last Name"
                onChangeText={handleChange("lastName")}
                helperText={errors.lastName}
                error={Boolean(errors.lastName)}
                onFocus={handleFoucs("lastName")}
              />
              <TextInput
                label="Mobile Number"
                left={
                  <Box pl={1.25}>
                    <Text variant="labelLarge">+92</Text>
                  </Box>
                }
                // onChangeText={(v) => {
                //   setPhone(v);
                //   // setPhone(formatPhoneNumber(v));
                // }}
                onChangeText={handleChange("phone")}
                keyboardType="numeric"
                maxLength={10}
                onFocus={handleFoucs("phone")}
                helperText={errors.phone}
                error={Boolean(errors.phone)}
              />
              <TextInput
                label="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                helperText={errors.email}
                error={Boolean(errors.email)}
                onFocus={handleFoucs("email")}
              />
              <Box gap={1.25}>
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
                    router.push("/login");
                  }}
                >
                  Already have an account? Login
                </Button>
              </Box>
            </Box>
            <AuthButton
              onPress={handleSubmit}
              loading={isLoading || isCheckingEmail}
            >
              Register
            </AuthButton>
          </Box>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <OptionsBottomSheet
        ref={ref}
        title="Select your account type"
        options={ACCOUNT_TYPES}
        onChange={(v) => setFieldValue("type", v)}
        value={values.type}
      />
    </>
  );
};

export default OnboardingRegister;
