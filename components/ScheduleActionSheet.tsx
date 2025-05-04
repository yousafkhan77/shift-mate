import React, { forwardRef, useState } from "react";
import { ActionSheetRef } from "react-native-actions-sheet";
import { Text, useTheme } from "react-native-paper";
import Box from "./Box";
import BottomSheet from "./BottomSheet";
import Button from "./Button";
import Calendar from "./Calendar";
import moment from "moment";
import BaseButton from "./BaseButton";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Dimensions, Platform } from "react-native";
import { isAndroid } from "@/utils";

interface ScheduleActionSheetProps {
  type?: string;
  onSchedule: (schedule: { date: string; time: string }) => void;
}

const { width } = Dimensions.get("window");

const Times = [
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
  "10:00 PM",
];

const DefaultSchedule = {
  date: moment().format("YYYY-MM-DD"),
  time: "",
};

const ScheduleActionSheet = forwardRef<
  ActionSheetRef,
  ScheduleActionSheetProps
>(({ type, onSchedule }, ref) => {
  const theme = useTheme();
  const [step, setStep] = useState("calendar");
  const [schedule, setSchedule] = useState({
    date: moment().format("YYYY-MM-DD"),
    time: "",
  });

  return (
    <BottomSheet
      ref={ref}
      initialSnapIndex={1}
      snapPoints={[100, 100]}
      onClose={() => {
        setStep("calendar");
        setSchedule(DefaultSchedule);
      }}
    >
      <Box px={3} pt={1.75} pb={1} gap={4}>
        <Text style={{ fontSize: 20, fontFamily: "SatoshiBold" }}>
          When do you want to schedule {type}?
        </Text>
        {step === "calendar" ? (
          <Calendar
            date={schedule.date}
            onDateChange={(newDate: string) =>
              setSchedule({ ...schedule, date: newDate })
            }
          />
        ) : (
          <Box>
            <Box
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text
                variant="titleLarge"
                style={{
                  fontFamily: "SatoshiBold",
                  color: (theme.colors as any).darkBlue,
                }}
              >
                {moment(schedule.date).format("MMM D, YYYY")}
              </Text>
              <BaseButton onPress={() => setStep("calendar")}>
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={25}
                  color="black"
                />
              </BaseButton>
            </Box>
            <Box
              direction="row"
              alignItems="center"
              flexWrap="wrap"
              gap={2}
              mt={3}
              px={Platform.select({ android: 2, ios: 3 })}
              justifyContent="center"
            >
              {Times.map((time) => {
                const itemWidth = isAndroid ? width / 6 : (width - 120) / 5;
                const [t, p] = time.split(" ");
                return (
                  <BaseButton
                    key={time}
                    onPress={() => setSchedule({ ...schedule, time })}
                  >
                    <Box
                      width={itemWidth}
                      alignItems="center"
                      justifyContent="center"
                      p={1}
                      borderRadius={6}
                      background={
                        time === schedule.time
                          ? (theme.colors as any).lightBlue
                          : (theme.colors as any).lightGrey
                      }
                    >
                      <Text
                        variant="titleSmall"
                        style={{ fontFamily: "Satoshi" }}
                      >
                        {t}
                      </Text>
                      <Text
                        variant="titleSmall"
                        style={{ fontFamily: "Satoshi" }}
                      >
                        {p.toLowerCase()}
                      </Text>
                    </Box>
                  </BaseButton>
                );
              })}
            </Box>
          </Box>
        )}
        <Button
          textColor="white"
          mode="contained"
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
          disabled={
            (step === "calendar" && !schedule.date) ||
            (step === "time" && !schedule.time)
          }
          onPress={() => {
            if (step === "calendar") {
              setStep("time");
            } else {
              onSchedule(schedule);
            }
          }}
        >
          Continue
        </Button>
      </Box>
    </BottomSheet>
  );
});

export default ScheduleActionSheet;
