import { useRegisterUserMutation } from "@/api/authentication";
import Box from "@/components/Box";
import Button from "@/components/Button";
import { useForm } from "@/components/Form";
import KeyboardAvoidingView from "@/components/KeyboardAvoidingView";
import TextInput from "@/components/TextInput";
import { updateStore } from "@/redux/slices/common";
import { useTypedDispatch } from "@/redux/store";
import { isAndroid } from "@/utils";
import { router } from "expo-router";
import { SafeAreaView } from "react-native";
import { Text, useTheme } from "react-native-paper";
import * as Yup from "yup";

const DATA = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
};

const SCHEMA = {
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  email: Yup.string()
    .email("Email is not valid.")
    .required("Email is required."),
  password: Yup.string().required("Password is required."),
  phone: Yup.string().required("Mobile number is required."),
};

const OnboardingRegister = () => {
  const theme = useTheme();
  const dispatch = useTypedDispatch();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const { errors, handleChange, handleFoucs, handleSubmit } = useForm({
    initialValues: DATA,
    validationSchema: Yup.object().shape(SCHEMA),
    onSubmit: (values: any) => {
      registerUser({
        ...values,
        phone: "+92" + values.phone.replace(/\s+/g, ""),
        email: values.email.toLowerCase(),
      }).then((res: any) => {
        if (!res.error) {
          const { accessToken, refreshToken, ...user } = res.data;
          dispatch(updateStore({ key: "user", value: user }));
          dispatch(updateStore({ key: "access-token", value: accessToken }));
          dispatch(updateStore({ key: "refresh-token", value: refreshToken }));
          router.replace("/(tabs)");
        }
      });
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
