import React, { useRef, useState } from "react";
import Box from "@/components/Box";
import PickupStepper from "@/components/PickupStepper";
import { router, useLocalSearchParams } from "expo-router";
import { Text, useTheme } from "react-native-paper";
import { Octicons } from "@expo/vector-icons";
import TextInput from "@/components/TextInput";
import { isAndroid } from "@/utils";
import ScheduleActionSheet from "@/components/ScheduleActionSheet";
import { ActionSheetRef } from "react-native-actions-sheet";

const CostEstimation = () => {
  const theme = useTheme();
  const [notes, setNotes] = useState("");
  const searchParams = useLocalSearchParams();
  const scheduleRef = useRef<ActionSheetRef>(null);

  return (
    <>
      <PickupStepper
        title="Booking Summary"
        endButtonTitle="Book"
        onContinue={() => {
          scheduleRef.current?.show();
        }}
      >
        <Box gap={4}>
          <Box
            borderWidth={1}
            borderColor={(theme.colors as any).inputBorder}
            borderRadius={8}
            p={2.5}
            background={(theme.colors as any).lightGrey}
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <Text variant="titleSmall" style={{ fontFamily: "Satoshi" }}>
              {searchParams.pickupType === "relocation"
                ? "Estimated Quote"
                : "Payable Amount"}
            </Text>
            <Text variant="titleLarge" style={{ fontFamily: "SatoshiBold" }}>
              PKR 1,000
            </Text>
          </Box>
          <Box gap={1}>
            <Box direction="row" alignItems="center" gap={1}>
              <Octicons name="location" size={18} color="black" />
              <Text
                variant="titleMedium"
                style={{ fontFamily: "SatoshiBold", marginBottom: 3 }}
              >
                Pickup Address
              </Text>
            </Box>
            <Text variant="titleSmall" style={{ fontFamily: "Satoshi" }}>
              {searchParams.movingFrom}
            </Text>
          </Box>
          <Box gap={1}>
            <Box direction="row" alignItems="center" gap={1}>
              <Octicons name="location" size={18} color="black" />
              <Text
                variant="titleMedium"
                style={{ fontFamily: "SatoshiBold", marginBottom: 3 }}
              >
                Drop-off Address
              </Text>
            </Box>
            <Text variant="titleSmall" style={{ fontFamily: "Satoshi" }}>
              {searchParams.movingTo}
            </Text>
          </Box>
          <TextInput
            label="Additional Details"
            multiline
            style={{ paddingTop: 5 }}
            inputStyle={{
              fontSize: 13,
              height: 85,
              ...(isAndroid ? { textAlignVertical: "top" } : {}),
            }}
            placeholder="Please type any additional details you want us to know about your move..."
            onChangeText={setNotes}
          />
        </Box>
      </PickupStepper>
      <ScheduleActionSheet
        ref={scheduleRef}
        onSchedule={(schedule) => {
          scheduleRef.current?.hide();
          router.push({
            pathname: "/confirmation",
            params: {
              ...searchParams,
              notes,
              scheduledDate: schedule.date,
              scheduledTime: schedule.time,
              amount: 1000,
            },
          });
        }}
      />
    </>
  );
};

export default CostEstimation;
