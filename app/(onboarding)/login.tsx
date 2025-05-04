import React from "react";
import { useLoginUserMutation } from "@/api/authentication";
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
import { SafeAreaView, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

const Login = () => {
  const theme = useTheme();
  // const dispatch = useTypedDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const { errors, handleChange, handleFoucs, handleSubmit } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validationRules: validationRules({
      email: "",
      password: "",
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
      //   loginUser(result.data).then((res: any) => {
      //     if (res.data) {
      //       dispatch(updateStore({ key: "user", value: res.data }));
      //       dispatch(updateAuth(res.data.token));
      //       if (isOnboarding) {
      //         AsyncStorage.setItem("onboarding-completed", "true");
      //         router.replace("/(tabs)");
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
      <Box
        flex={1}
        px={2.5}
        pt={isAndroid ? 28 / 4 : 4}
        pb={2.5}
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
            helperText="Email address is required."
            onFocus={handleFoucs("email")}
            error={Boolean(errors.email)}
          />
          <View style={{ gap: 10 }}>
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
                router.push("/register");
              }}
            >
              Don't have an account? Sign up
            </Button>
          </View>
        </View>
        <Button
          textColor="white"
          mode="contained"
          loading={isLoading}
          onPress={handleSubmit}
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
          Login
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default Login;
