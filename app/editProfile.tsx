import {
  useEmailCheckMutation,
  useUpdateUserMutation,
  useUpdateUserPasswordMutation,
} from "@/api/authentication";
import Box from "@/components/Box";
import { useForm } from "@/components/Form";
import IconButton from "@/components/IconButton";
import TextInput from "@/components/TextInput";
import useAsyncStorage from "@/hooks/useAsyncStorage";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Platform, SafeAreaView } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

const NAME_SCHEMA = {
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
};

const PASSWORD_SCHEMA = {
  password: Yup.string().required("Current password is required."),
  newPassword: Yup.string()
    .required("New password is required.")
    .notOneOf(
      [Yup.ref("password")],
      "New password must be different from current password."
    ),
};

const OTHER_SCHEMA = {
  email: {
    email: Yup.string()
      .email("Email is not valid.")
      .required("Email is required."),
  },
  phone: {
    phone: Yup.string().required("Mobile number is required."),
  },
};

const EditProfile = () => {
  const { label, propertyKey } = useLocalSearchParams();
  const [user, setUser] = useAsyncStorage("user");
  const [updatePassword, { isLoading: isUpdating }] =
    useUpdateUserPasswordMutation();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [emailCheck, { isLoading: isCheckingEmail }] = useEmailCheckMutation();

  const onUpdate = (values: any) => {
    updateUser(values).then((res: any) => {
      if (!res.error) {
        setUser({ ...user, ...values });
        Toast.show({
          type: "tomatoToast",
          text1: res.data.message,
        });
        router.back();
      }
    });
  };

  const { values, errors, handleChange, handleFoucs, handleSubmit } = useForm({
    initialValues: !user
      ? {}
      : propertyKey === "name"
      ? {
          firstName: user.firstName,
          lastName: user.lastName,
        }
      : propertyKey === "password"
      ? { password: "", newPassword: "" }
      : { [propertyKey as "name"]: user[propertyKey as any] },
    validationSchema: Yup.object().shape(
      propertyKey === "name"
        ? NAME_SCHEMA
        : propertyKey === "password"
        ? PASSWORD_SCHEMA
        : OTHER_SCHEMA[propertyKey as "email"]
    ),
    onSubmit: (values: any) => {
      if (propertyKey === "password") {
        updatePassword({ password: values.newPassword }).then((res: any) => {
          if (!res.error) {
            Toast.show({
              type: "tomatoToast",
              text1: res.data.message,
            });
            router.back();
          }
        });
      } else {
        if (propertyKey === "email") {
          if (values.email !== user.email) {
            emailCheck(values).then((emailRes: any) => {
              if (!emailRes.error) onUpdate(values);
            });
          } else {
            router.back();
          }
        } else {
          if (values.phone) {
            values.phone =
              "+92" + values.phone.replace("+92", "").replace(/\s+/g, "");
          }
          onUpdate(values);
        }
      }
    },
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Box
        flex={1}
        px={2.5}
        pt={Platform.select({ ios: 2, android: 5.5 })}
        gap={3}
      >
        <Box direction="row" alignItems="center">
          <IconButton onPress={() => router.back()}>
            <Feather name="arrow-left" size={22} color="black" />
          </IconButton>
          <Box flex={1} justifyContent="center" alignItems="center">
            <Text
              style={{
                fontSize: 18,
                fontFamily: "SatoshiBold",
              }}
            >
              {label}
            </Text>
          </Box>
          {isLoading || isCheckingEmail || isUpdating ? (
            <ActivityIndicator size="small" />
          ) : (
            <IconButton onPress={handleSubmit}>
              <Feather name="check" size={22} color="black" />
            </IconButton>
          )}
        </Box>
        <Box gap={2}>
          {propertyKey === "name" ? (
            <>
              <TextInput
                label="First Name"
                onChangeText={handleChange("firstName")}
                helperText={errors.firstName}
                error={Boolean(errors.firstName)}
                defaultValue={values.firstName}
                onFocus={handleFoucs("firstName")}
              />
              <TextInput
                label="Last Name"
                onChangeText={handleChange("lastName")}
                helperText={errors.lastName}
                error={Boolean(errors.lastName)}
                defaultValue={values.lastName}
                onFocus={handleFoucs("lastName")}
              />
            </>
          ) : propertyKey === "email" ? (
            <TextInput
              label="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              helperText={errors.email}
              error={Boolean(errors.email)}
              onFocus={handleFoucs("email")}
              defaultValue={values.email}
            />
          ) : propertyKey === "phone" ? (
            <TextInput
              label="Mobile Number"
              left={
                <Box pl={1.25}>
                  <Text variant="labelLarge">+92</Text>
                </Box>
              }
              defaultValue={values.phone?.replace("+92", "")}
              onChangeText={handleChange("phone")}
              keyboardType="numeric"
              maxLength={10}
              onFocus={handleFoucs("phone")}
              helperText={errors.phone}
              error={Boolean(errors.phone)}
            />
          ) : propertyKey === "password" ? (
            <>
              <TextInput
                label="Current password"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={handleChange("password")}
                helperText={errors.password}
                error={Boolean(errors.password)}
                onFocus={handleFoucs("password")}
              />
              <TextInput
                label="New password"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={handleChange("newPassword")}
                helperText={errors.newPassword}
                error={Boolean(errors.newPassword)}
                defaultValue={values.newPassword}
                onFocus={handleFoucs("newPassword")}
              />
            </>
          ) : null}
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default EditProfile;
