import React, { useState } from "react";
import { useRegisterUserMutation } from "@/api/authentication";
import Box from "@/components/Box";
import Button from "@/components/Button";
import { useForm } from "@/components/Form";
import TextInput from "@/components/TextInput";
// import { updateAuth } from "@/redux/slices/auth";
// import { updateStore, updateToastMessage } from "@/redux/slices/common";
// import { useTypedDispatch } from "@/redux/store";
import { isAndroid, validationRules } from "@/utils";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { SafeAreaView } from "react-native";
import { Text, useTheme } from "react-native-paper";
import KeyboardAvoidingView from "@/components/KeyboardAvoidingView";

const OnboardingRegister = () => {
  const theme = useTheme();
  // const dispatch = useTypedDispatch();
  // const [phone, setPhone] = useState("");
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const { errors, handleChange, handleFoucs, handleSubmit } = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    },
    validationRules: validationRules({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
    }),
    onSubmit: (values: any) => {
      router.replace("/(tabs)");
      // const result = schema.safeParse(values);
      // if (!result.success) {
      //   const errObj: { [key: string]: string } = {};
      //   result.error.errors.forEach((err) => {
      //     errObj[err.path[0]] = err.message;
      //   });
      //   setErrors(errObj);
      // } else {
      //   const fin: any = {
      //     ...result.data,
      //   };
      //   if (phone) {
      //     fin.contact = "+1" + phone.replace(/\s+/g, "");
      //   }
      //   registerUser(fin).then((res: any) => {
      //     if (res.data) {
      //       dispatch(updateStore({ key: "user", value: res.data }));
      //       dispatch(updateAuth(res.data.token));
      //       if (isOnboarding) {
      //         AsyncStorage.setItem("onboarding-completed", "true");
      //         // router.replace("/(tabs)");
      //       } else {
      //         router.dismiss();
      //       }
      //     } else {
      //       dispatch(
      //         updateToastMessage({ type: "error", message: res.error.data.error })
      //       );
      //     }
      //   });
      // }
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView>
        <Box
          flex={1}
          px={3}
          pt={isAndroid ? 28 / 4 : 4}
          pb={2.5}
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
            <TextInput
              label="First Name"
              onChangeText={handleChange("firstName")}
              helperText="First name is required."
              error={Boolean(errors.firstName)}
              onFocus={handleFoucs("firstName")}
            />
            <TextInput
              label="Last Name"
              onChangeText={handleChange("lastName")}
              helperText="Last name is required."
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
              helperText="Mobile number is required."
              error={Boolean(errors.phone)}
            />
            <TextInput
              label="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              helperText="Email address is required."
              error={Boolean(errors.email)}
              onFocus={handleFoucs("email")}
            />
            <Box gap={1.25}>
              <TextInput
                label="Password"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={handleChange("password")}
                helperText="Password is required."
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
        </Box>
      </KeyboardAvoidingView>
      <Box px={3} py={2.5}>
        <Button
          textColor="white"
          mode="contained"
          onPress={handleSubmit}
          loading={isLoading}
          style={{
            borderRadius: 100,
            height: 46,
            justifyContent: "center",
            minWidth: 130,
          }}
          labelStyle={{
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          Register
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default OnboardingRegister;
