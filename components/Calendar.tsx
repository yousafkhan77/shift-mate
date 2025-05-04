import React, { useMemo, useState } from "react";
import Box from "./Box";
import Feather from "@expo/vector-icons/Feather";
import { Text, useTheme } from "react-native-paper";
import moment from "moment";
import BaseButton from "./BaseButton";

interface CalendarProps {
  date?: string;
  onDateChange?: (newDate: string) => void;
}

const dayAlpha = Array.from(
  { length: 7 },
  (_, i) => moment().day(i).format("dd")[0]
);

const Calendar = ({ date, onDateChange }: CalendarProps) => {
  const theme = useTheme();
  const today = moment();
  const [currentMonth, setCurrentMonth] = useState(
    date ? moment(date) : moment()
  );

  const selectedDate = date ? moment(date) : null;

  const daysInMonth = currentMonth.daysInMonth();
  const startDay = currentMonth.startOf("month").day();
  // Memoize the calendar days and weeks generation
  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];

    // Fill in empty slots before the first day of the month
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    // Fill in the actual days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    // Fill in the empty slots after the last day of the month to make complete weeks
    while (days.length % 7 !== 0) {
      days.push(null);
    }

    return days;
  }, [currentMonth, daysInMonth, startDay]);

  const weeks = useMemo(() => {
    return Array.from({ length: calendarDays.length / 7 }, (_, i) =>
      calendarDays.slice(i * 7, (i + 1) * 7)
    );
  }, [calendarDays]);

  const handleDateSelect = (day: number) => {
    if (!onDateChange) return;
    const selectedDate = currentMonth.clone().date(day).format("YYYY-MM-DD");
    onDateChange(selectedDate);
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => prev.clone().subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => prev.clone().add(1, "month"));
  };

  return (
    <Box gap={4}>
      {/* Top Header */}
      <Box
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        <BaseButton onPress={handlePrevMonth}>
          <Feather name="chevron-left" size={26} color={theme.colors.primary} />
        </BaseButton>
        <Text variant="titleLarge" style={{ fontFamily: "SatoshiBold" }}>
          {currentMonth.format("MMMM YYYY")}
        </Text>
        <BaseButton onPress={handleNextMonth}>
          <Feather
            name="chevron-right"
            size={26}
            color={theme.colors.primary}
          />
        </BaseButton>
      </Box>
      <Box gap={2}>
        {/* Day Letters */}
        <Box
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          {dayAlpha.map((d, i) => (
            <Text
              key={d + i}
              variant="titleMedium"
              style={{
                fontFamily: "SatoshiBold",
                color: i === 0 ? (theme.colors as any).grey600 : undefined,
              }}
            >
              {d}
            </Text>
          ))}
        </Box>

        {/* Calendar Days */}
        {weeks.map((week, wi) => (
          <Box
            key={wi}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
          >
            {week.map((day, di) => {
              if (!day) {
                return <Box key={wi + "-" + di} height={34} width={34} />;
              }
              const thisDate = currentMonth.clone().date(day);
              const isPast = thisDate.isBefore(today, "day");
              const isSelected =
                day &&
                selectedDate &&
                selectedDate.isSame(currentMonth.clone().date(day), "day");

              return (
                <BaseButton
                  key={wi + "-" + di}
                  onPress={() => !isPast && handleDateSelect(day)}
                  disabled={isPast}
                >
                  <Box
                    alignItems="center"
                    justifyContent="center"
                    height={34}
                    width={34}
                    background={
                      isSelected ? (theme.colors as any).primary : undefined
                    }
                    borderRadius={1000}
                  >
                    {day ? (
                      <Text
                        variant="titleMedium"
                        style={{
                          fontFamily: "SatoshiMedium",
                          color: isPast
                            ? (theme.colors as any).grey600
                            : isSelected
                            ? (theme.colors as any).white
                            : (theme.colors as any).black,
                        }}
                      >
                        {day}
                      </Text>
                    ) : null}
                  </Box>
                </BaseButton>
              );
            })}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Calendar;
