import { useGetAddressesQuery } from "@/api";
import BaseButton from "@/components/BaseButton";
import Box from "@/components/Box";
import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import { Feather, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { FlatList, Platform, SafeAreaView } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { AppTheme } from "./_layout";

const Addresses = () => {
  const theme = useTheme<AppTheme>();
  const { data: addresses = [], isFetching } = useGetAddressesQuery(undefined);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }}>
      <Box
        flex={1}
        pt={Platform.select({ ios: 2, android: 5.5 })}
        pb={Platform.select({ ios: 0, android: 2.5 })}
        gap={3}
      >
        <Box px={2.5} direction="row" alignItems="center" gap={3}>
          <IconButton onPress={() => router.back()}>
            <Feather name="x" size={22} color="black" />
          </IconButton>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "SatoshiBold",
            }}
          >
            Addresses
          </Text>
        </Box>
        <Box px={2.5} flex={1}>
          {isFetching ? (
            <Box minHeight={200} justifyContent="center" alignItems="center">
              <ActivityIndicator />
            </Box>
          ) : (
            <FlatList
              data={addresses}
              keyExtractor={(item) => item.addressID}
              renderItem={({ item }) => (
                <BaseButton
                  onPress={() => {
                    const [lat, lon] = (item.coordinates as any).split(",");
                    router.push({
                      pathname: "/locationPicker",
                      params: {
                        addressID: item.addressID,
                        location: JSON.stringify({
                          ...item,
                          coordinates: { lat, lon },
                          formatted: item.addressFull,
                        }),
                      },
                    });
                  }}
                >
                  <Box
                    direction="row"
                    alignItems="center"
                    gap={2}
                    borderRadius={5}
                    py={2}
                    justifyContent="space-between"
                  >
                    <Box
                      width="90%"
                      direction="row"
                      alignItems="center"
                      gap={2}
                    >
                      <Octicons
                        name="location"
                        size={22}
                        color={theme.colors.spaceBlack}
                      />
                      <Box width="100%">
                        <Text
                          numberOfLines={1}
                          style={{
                            fontSize: 17,
                            fontFamily: "SatoshiBold",
                            width: "90%",
                            color: theme.colors.spaceBlack,
                          }}
                        >
                          {item.address}
                        </Text>
                        {(item.town || item.city) && (
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 14,
                              fontFamily: "Satoshi",
                              width: "90%",
                              color: theme.colors.spaceBlack,
                            }}
                          >
                            {item.town || item.city}
                          </Text>
                        )}
                      </Box>
                    </Box>
                    <Octicons
                      name="pencil"
                      size={20}
                      color={theme.colors.spaceBlack}
                    />
                  </Box>
                </BaseButton>
              )}
            />
          )}
        </Box>
        <Box px={2.5}>
          <Button
            disabled={isFetching}
            mode="contained"
            onPress={() => router.push("/locationPicker")}
          >
            Add New Address
          </Button>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default Addresses;
