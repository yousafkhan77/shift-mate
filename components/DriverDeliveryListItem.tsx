import { Delivery } from "@/api/delivery";
import { AppTheme } from "@/app/_layout";
import moment from "moment";
import React from "react";
import { Text, useTheme } from "react-native-paper";
import AddressStepper from "./AddressStepper";
import BaseButton from "./BaseButton";
import Box from "./Box";

interface DriverDeliveryListItemProps extends Delivery {
  onPress: () => void;
  isBooking?: boolean;
}

const DriverDeliveryListItem = ({
  pickup,
  dropoff,
  deliveryFare,
  onPress,
  deliveryState,
  isBooking,
  createdAt,
}: DriverDeliveryListItemProps) => {
  const theme = useTheme<AppTheme>();
  return (
    <BaseButton onPress={onPress}>
      <Box
        mb={2}
        py={1.5}
        px={1.5}
        borderRadius={8}
        background={theme.colors.lightGrey}
        gap={2}
      >
        <Box
          direction="row"
          alignItems={isBooking ? "flex-start" : "center"}
          justifyContent="space-between"
        >
          <Box gap={1}>
            <Box direction="row" alignItems="center" gap={1}>
              <Text variant="titleMedium" style={{ fontFamily: "SatoshiBold" }}>
                Delivery
              </Text>
              {deliveryState && (
                <Box
                  borderRadius={4}
                  px={1}
                  pb={0.25}
                  justifyContent="center"
                  alignItems="center"
                  background={
                    deliveryState === "accepted"
                      ? theme.colors.green
                      : deliveryState === "canceled"
                      ? theme.colors.error
                      : theme.colors.borderGrey
                  }
                >
                  <Text
                    variant="titleSmall"
                    style={{
                      textTransform: "capitalize",
                      fontFamily: "SatoshiBold",
                      color:
                        deliveryState === "canceled"
                          ? theme.colors.white
                          : theme.colors.spaceBlack,
                    }}
                  >
                    {deliveryState}
                  </Text>
                </Box>
              )}
            </Box>
            {isBooking && (
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Satoshi",
                  color: theme.colors.spaceGrey,
                }}
              >
                {moment(createdAt).format("DD-MM-YYYY hh:mm A")}
              </Text>
            )}
          </Box>
          <Box direction="row" alignItems="center">
            <Text variant="titleMedium" style={{ fontFamily: "SatoshiBold" }}>
              PKR {deliveryFare}
            </Text>
            {/* <IconButton style={{ marginTop: 3 }}>
            <Feather
              name="chevron-right"
              size={22}
              color={theme.colors.spaceBlack}
            />
          </IconButton> */}
          </Box>
        </Box>
        <AddressStepper
          pickup={pickup?.addressFull}
          dropoff={dropoff?.addressFull}
        />
      </Box>
    </BaseButton>
  );
};

export default DriverDeliveryListItem;
