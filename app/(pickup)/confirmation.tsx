import React, { useMemo } from "react";
import Box from "@/components/Box";
import PickupStepper from "@/components/PickupStepper";
import { router, useLocalSearchParams } from "expo-router";
import { Text, TextProps, useTheme } from "react-native-paper";
import moment from "moment";
import {
  AllItemsMap,
  capitalize,
  ItemCategoriesMap,
  SpaceOptionsMap,
} from "@/utils";
import { ScrollView } from "react-native";

const KeyValue = ({
  title,
  value,
  titleProps,
  valueProps,
}: {
  title: string;
  value: any;
  titleProps?: TextProps<any>;
  valueProps?: TextProps<any>;
}) => (
  <Box
    width="99%"
    direction="row"
    alignItems="center"
    justifyContent="space-between"
  >
    <Text
      variant="titleSmall"
      style={[{ fontFamily: "Satoshi" }, titleProps?.style]}
    >
      {title}
    </Text>
    <Text
      variant="titleSmall"
      style={[
        {
          fontFamily: "Satoshi",
        },
        valueProps?.style,
      ]}
    >
      {value}
    </Text>
  </Box>
);

const Confirmation = () => {
  const searchParams: any = useLocalSearchParams();

  const items = useMemo(() => {
    try {
      return JSON.parse(searchParams.itemCatsMap);
    } catch (err) {}
  }, [searchParams]);

  return (
    <PickupStepper
      title="Booking Confirmation"
      endButtonTitle="Confirm"
      onContinue={() => {
        router.push("/success");
      }}
    >
      <ScrollView
        style={{ height: "82%" }}
        showsVerticalScrollIndicator={false}
      >
        <Box gap={2.5}>
          <KeyValue
            title="Booking Type:"
            value={searchParams.pickupType}
            valueProps={{ style: { textTransform: "capitalize" } } as any}
          />
          <KeyValue
            title="Move Date:"
            value={moment(searchParams.scheduledDate).format("MMM D, YYYY")}
          />
          <KeyValue
            title="Move Time:"
            value={searchParams.scheduledTime}
            valueProps={{ style: { textTransform: "lowercase" } } as any}
          />
          <KeyValue
            title={
              searchParams.pickupType === "relocation"
                ? "Total Quote:"
                : "Total Amount:"
            }
            value={searchParams.amount}
          />
          <KeyValue title="Pickup Address:" value={searchParams.movingFrom} />
          <KeyValue title="Drop-off Address:" value={searchParams.movingTo} />
          {/* <Box
            height={0.25}
            width="100%"
            background={(theme.colors as any).inputBorder}
          /> */}
          <Box gap={2}>
            <Text style={{ fontSize: 17, fontFamily: "SatoshiBold" }}>
              {capitalize(searchParams.pickupType)} Details
            </Text>
            <KeyValue
              title={
                searchParams.pickupType === "relocation"
                  ? "Relocate:"
                  : "Delivery:"
              }
              value={
                searchParams.movingCategory === "everything"
                  ? "Everything"
                  : "Specific Items"
              }
            />
            {searchParams.movingCategory === "everything" &&
            searchParams.movingFromPropertyType === "house" ? (
              <>
                <Text
                  variant="titleMedium"
                  style={{ fontFamily: "SatoshiBold" }}
                >
                  Spaces
                </Text>
                {searchParams.spaces &&
                  searchParams.spaces.split(",").map((sp: string) => (
                    <Text
                      key={sp}
                      variant="titleSmall"
                      style={{ fontFamily: "Satoshi" }}
                    >
                      {SpaceOptionsMap[sp].label}
                    </Text>
                  ))}
              </>
            ) : items ? (
              <>
                <Text
                  variant="titleMedium"
                  style={{ fontFamily: "SatoshiBold" }}
                >
                  Items
                </Text>
                {items &&
                  Object.keys(items).map((c) => (
                    <Box gap={2} key={c}>
                      <Text
                        variant="titleSmall"
                        style={{ fontFamily: "SatoshiBold" }}
                      >
                        {ItemCategoriesMap[c].label}
                      </Text>
                      {Object.keys(items[c]).map((k) => (
                        <KeyValue
                          key={k}
                          title={AllItemsMap[k].title}
                          value={`${items[c][k]}`}
                        />
                      ))}
                    </Box>
                  ))}
              </>
            ) : null}
          </Box>
          {searchParams.notes && (
            <Box gap={2}>
              <Text style={{ fontSize: 17, fontFamily: "SatoshiBold" }}>
                Notes
              </Text>
              <Text variant="titleSmall" style={{ fontFamily: "Satoshi" }}>
                {searchParams.notes}
              </Text>
            </Box>
          )}

          {/* <Box gap={2}>
            <Text variant="titleMedium" style={{ fontFamily: "SatoshiBold" }}>
              Pickup
            </Text>
            <KeyValue title="Address:" value={searchParams.movingFrom} />
            <KeyValue
              title="Property Type:"
              value={
                PropertyTypesMap[searchParams.movingFromPropertyType as any]
                  .label
              }
              valueProps={{ style: { textTransform: "capitalize" } } as any}
            />
            {searchParams.movingFromPropertyType === "house" && (
              <KeyValue
                title="House Type:"
                value={
                  HouseTypesMap[searchParams.movingFromHouseType as any].label
                }
                valueProps={{ style: { textTransform: "capitalize" } } as any}
              />
            )}
            {(searchParams.movingFromHouseType === "apartment" ||
              searchParams.movingFromPropertyType === "office") && (
              <>
                <KeyValue
                  title="Lift Available:"
                  value={searchParams.movingFromLiftAvailable}
                  valueProps={{ style: { textTransform: "capitalize" } } as any}
                />
                <KeyValue title="Floor:" value={searchParams.movingFromFloor} />
              </>
            )}
          </Box> */}
          {/* <Box
            height={0.25}
            width="100%"
            background={(theme.colors as any).inputBorder}
          /> */}
          {/* <Box gap={2}>
            <Text variant="titleMedium" style={{ fontFamily: "SatoshiBold" }}>
              Drop-off
            </Text>
            <KeyValue title="Address:" value={searchParams.movingTo} />
            <KeyValue
              title="Property Type:"
              value={
                PropertyTypesMap[searchParams.movingToPropertyType as any].label
              }
              valueProps={{ style: { textTransform: "capitalize" } } as any}
            />
            {searchParams.movingToPropertyType === "house" && (
              <KeyValue
                title="House Type:"
                value={
                  HouseTypesMap[searchParams.movingToHouseType as any].label
                }
                valueProps={{ style: { textTransform: "capitalize" } } as any}
              />
            )}
            {(searchParams.movingToHouseType === "apartment" ||
              searchParams.movingToPropertyType === "office") && (
              <>
                <KeyValue
                  title="Lift Available:"
                  value={searchParams.movingToLiftAvailable}
                  valueProps={{ style: { textTransform: "capitalize" } } as any}
                />
                <KeyValue title="Floor:" value={searchParams.movingToFloor} />
              </>
            )}
          </Box> */}
          {/* <Box
            height={0.25}
            width="100%"
            background={(theme.colors as any).inputBorder}
          /> */}
        </Box>
      </ScrollView>
    </PickupStepper>
  );
};

export default Confirmation;
