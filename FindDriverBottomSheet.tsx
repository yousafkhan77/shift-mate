import { useUpdateDeliveryStatusMutation } from "@/api/delivery";
import { AppTheme } from "@/app/_layout";
import { router } from "expo-router";
import React, { forwardRef } from "react";
import { Alert, Dimensions, Platform } from "react-native";
import { ActionSheetRef } from "react-native-actions-sheet";
import { Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AddressStepper from "./AddressStepper";
import BottomSheet from "./BottomSheet";
import Box from "./Box";
import Button from "./Button";

const { height } = Dimensions.get("window");

const FindDriverBottomSheet = forwardRef<ActionSheetRef, any>(
  ({ deliveryFare, movingFrom, movingTo, deliveryID }, ref) => {
    const theme = useTheme<AppTheme>();
    const insets = useSafeAreaInsets();
    const [updateDeliveryStatus, { isLoading: isUpdating }] =
      useUpdateDeliveryStatusMutation();

    const onCancel = () => {
      Alert.alert(
        "Cancel Delivery",
        "Are you sure, you would like to cancel this delivery?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Confirm",
            style: "destructive",
            onPress: () => {
              updateDeliveryStatus({ status: "canceled", deliveryID }).then(
                (res: any) => {
                  if (!res.error) {
                    router.replace("/(tabs)");
                  }
                }
              );
            },
          },
        ]
      );
    };

    return (
      <BottomSheet
        ref={ref}
        isModal={false}
        initialSnapIndex={1}
        snapPoints={[100, 100]}
        closable={false}
        backgroundInteractionEnabled
      >
        <Box
          gap={2}
          minHeight={Platform.select({
            ios: height * 0.385,
            android: height * 0.5,
          })}
        >
          <Box
            px={3}
            pb={Platform.select({ ios: 0, android: insets.bottom / 6 })}
            flex={1}
            pt={1}
          >
            <Box gap={2} flex={1}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "SatoshiBold",
                  textAlign: "center",
                }}
              >
                Finding drivers...
              </Text>
              <Box>
                <Box
                  mt={0.75}
                  gap={0.75}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text
                    variant="titleMedium"
                    style={{
                      fontFamily: "Satoshi",
                      color: theme.colors.iconGrey,
                    }}
                  >
                    Your offer
                  </Text>
                  <Text
                    variant="titleLarge"
                    style={{
                      fontFamily: "SatoshiBold",
                      color: theme.colors.spaceBlack,
                    }}
                  >
                    PKR {deliveryFare}
                  </Text>
                </Box>
                <Box gap={2} mt={3}>
                  <Text
                    variant="titleSmall"
                    style={{
                      fontFamily: "Satoshi",
                      color: theme.colors.iconGrey,
                    }}
                  >
                    Your current delivery
                  </Text>
                  <AddressStepper
                    pickup={`${movingFrom?.formatted}`}
                    dropoff={`${movingTo?.formatted}`}
                  />
                  {/* <Box gap={1.25} direction="row" alignItems="center">
                    <Octicons name="location" size={20} color="black" />
                    <Text style={{ fontFamily: "Satoshi" }}>
                      {movingFrom?.address} (Pickup)
                    </Text>
                  </Box>
                  <Box gap={1.25} direction="row" alignItems="center">
                    <Octicons name="location" size={20} color="black" />
                    <Text style={{ fontFamily: "Satoshi" }}>
                      {movingTo?.address} (Dropoff)
                    </Text>
                  </Box> */}
                </Box>
              </Box>
            </Box>
            <Box gap={1.5}>
              <Button
                onPress={onCancel}
                style={{
                  paddingBottom: 0,
                  backgroundColor: "#FAE2E0",
                }}
                loading={isUpdating}
                textColor={theme.colors.error}
              >
                Cancel request
              </Button>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    );
  }
);

export default FindDriverBottomSheet;
