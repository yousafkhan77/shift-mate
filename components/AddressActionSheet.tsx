import React, { forwardRef, useState } from "react";
import BottomSheet from "./BottomSheet";
import Box from "./Box";
import { Text, useTheme } from "react-native-paper";
import { ActionSheetRef } from "react-native-actions-sheet";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import RadioButton from "./RadioButton";
import BaseButton from "./BaseButton";

const Addresses = [
  "House No. 12, Street 45, F-8/1, Islamabad",
  "House No. 32, Street 15, Islamabad",
];

const AddressActionSheet = forwardRef<ActionSheetRef, any>((props, ref) => {
  const theme = useTheme();
  const [selected, setSelected] = useState(0);
  return (
    <BottomSheet ref={ref} initialSnapIndex={1} snapPoints={[100, 100]}>
      <Box pb={5.5} pt={1} gap={3.5}>
        <Box px={3}>
          <Text style={{ fontSize: 20, fontFamily: "SatoshiBold" }}>
            What is your address?
          </Text>
        </Box>
        <Box gap={1.25} px={1}>
          <Box direction="row" px={2} alignItems="center" gap={1.25}>
            <Ionicons
              name="navigate-outline"
              size={22}
              color="black"
              style={{ marginTop: 4 }}
            />
            <Text style={{ fontSize: 17, fontFamily: "SatoshiBold" }}>
              Use my current location
            </Text>
          </Box>
          {Addresses.map((a, i) => (
            <BaseButton
              key={i}
              onPress={() => {
                setSelected(i);
              }}
            >
              <Box
                direction="row"
                alignItems="center"
                gap={1.25}
                borderRadius={5}
                px={2}
                py={1.5}
                background={
                  selected === i ? (theme.colors as any).lightGrey : ""
                }
              >
                <RadioButton selected={selected === i} />
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: "SatoshiBold",
                    width: "90%",
                  }}
                >
                  {a}
                </Text>
              </Box>
            </BaseButton>
          ))}
          <Box direction="row" px={2} alignItems="center" gap={1.25}>
            <AntDesign name="plus" size={18} color="black" />
            <Text style={{ fontSize: 17, fontFamily: "SatoshiBold" }}>
              Add a new address
            </Text>
          </Box>
        </Box>
      </Box>
    </BottomSheet>
  );
});

export default AddressActionSheet;
