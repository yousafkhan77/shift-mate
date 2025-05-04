import BaseButton from "@/components/BaseButton";
import Box from "@/components/Box";
import IconButton from "@/components/IconButton";
import { lightShadowProps } from "@/utils";
import { Feather, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Platform, SafeAreaView } from "react-native";
import { Text, useTheme } from "react-native-paper";

const DetailItem = ({ label, value, onPress }: any) => {
  return (
    <Box
      gap={1}
      background="white"
      borderRadius={10}
      p={2}
      boxStyle={lightShadowProps}
    >
      <Box direction="row" alignItems="center" justifyContent="space-between">
        <Text variant="titleSmall" style={{ fontFamily: "Satoshi" }}>
          {label}
        </Text>
        <IconButton onPress={onPress}>
          <Octicons name="pencil" size={20} color="black" />
        </IconButton>
      </Box>
      <Text style={{ fontSize: 15, fontFamily: "SatoshiBold" }}>{value}</Text>
    </Box>
  );
};

const UserDetails = [
  { label: "Name", propertyKey: "name", value: "John Doe" },
  { label: "Email", propertyKey: "email", value: "johndoe@gmail.com" },
  { label: "Password", propertyKey: "password", value: "............" },
  { label: "Mobile number", propertyKey: "phone", value: "+923434343434" },
];

const Profile = () => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: (theme.colors as any).lightGrey }}
    >
      <Box
        flex={1}
        px={2.5}
        pt={Platform.select({ ios: 2, android: 5.5 })}
        gap={3}
      >
        <Box direction="row" alignItems="center">
          <IconButton onPress={() => router.back()}>
            <Feather name="x" size={22} color="black" />
          </IconButton>
          <Box flex={1} justifyContent="center" alignItems="center">
            <Text
              style={{
                fontSize: 18,
                fontFamily: "SatoshiBold",
              }}
            >
              Profile
            </Text>
          </Box>
          <Feather name="x" size={22} color="black" style={{ opacity: 0 }} />
        </Box>
        <Box gap={3}>
          <Text style={{ fontSize: 20, fontFamily: "SatoshiBold" }}>
            Personal details
          </Text>
          <Box gap={2}>
            {UserDetails.map((ud) => (
              <DetailItem
                key={ud.propertyKey}
                label={ud.label}
                value={ud.value}
                onPress={() =>
                  router.push({
                    pathname: "/editProfile",
                    params: ud,
                  })
                }
              />
            ))}
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default Profile;
