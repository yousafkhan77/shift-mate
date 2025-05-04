import React from "react";
import Box from "@/components/Box";
import { useForm } from "@/components/Form";
import IconButton from "@/components/IconButton";
import TextInput from "@/components/TextInput";
import { validationRules } from "@/utils";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Platform, SafeAreaView } from "react-native";
import { Text } from "react-native-paper";

const EditProfile = () => {
  const { label, propertyKey, value } = useLocalSearchParams();

  const { values, errors, handleChange, handleFoucs, handleSubmit } = useForm({
    initialValues:
      propertyKey === "name"
        ? {
            firstName: (value as any).split(" ")[0],
            lastName: (value as any).split(" ")[1],
          }
        : propertyKey === "password"
        ? { password: "", newPassword: "" }
        : { [propertyKey as "name"]: value },
    validationRules: validationRules(
      propertyKey === "name"
        ? {
            firstName: "",
            lastName: "",
          }
        : propertyKey === "password"
        ? { password: "", newPassword: "" }
        : { [propertyKey as "name"]: "" }
    ),
    onSubmit: (values: any) => {
      router.back();
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
          <IconButton onPress={handleSubmit}>
            <Feather name="check" size={22} color="black" />
          </IconButton>
        </Box>
        <Box gap={2}>
          {propertyKey === "name" ? (
            <>
              <TextInput
                label="First Name"
                onChangeText={handleChange("firstName")}
                helperText="First name is required."
                error={Boolean(errors.firstName)}
                defaultValue={values.firstName}
                onFocus={handleFoucs("firstName")}
              />
              <TextInput
                label="Last Name"
                onChangeText={handleChange("lastName")}
                helperText="Last name is required."
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
              helperText="Email address is required."
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
              helperText="Mobile number is required."
              error={Boolean(errors.phone)}
            />
          ) : propertyKey === "password" ? (
            <>
              <TextInput
                label="Current password"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={handleChange("password")}
                helperText="Current password is required."
                error={Boolean(errors.password)}
                onFocus={handleFoucs("password")}
              />
              <TextInput
                label="New password"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={handleChange("newPassword")}
                helperText="New password is required."
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
