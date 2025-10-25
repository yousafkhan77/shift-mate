import BaseButton from "@/components/BaseButton";
import Box from "@/components/Box";
import PickupStepper from "@/components/PickupStepper";
import QuantityInput from "@/components/QuantityInput";
import TextInput from "@/components/TextInput";
import { HouseTypes, isAndroid, shadowProps } from "@/utils";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Platform } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface PickupDetailsProps {
  type?: string;
}

const PropertyTypes = [
  {
    label: "House",
    value: "house",
    icon: <Octicons name="home" size={24} color="#10074E" />,
  },
  {
    label: "Office",
    value: "office",
    icon: (
      <MaterialCommunityIcons
        name="office-building-outline"
        size={24}
        color="#10074E"
      />
    ),
  },
  {
    label: "Warehouse",
    value: "warehouse",
    icon: <MaterialCommunityIcons name="warehouse" size={24} color="#10074E" />,
  },
];

const PickupDetails = ({ type = "pickup" }: PickupDetailsProps) => {
  const theme = useTheme();
  const searchParams = useLocalSearchParams();
  const [selected, setSelected] = useState("house");
  const [houseType, setHouseType] = useState("");
  const [liftAvailable, setLiftAvailable] = useState("");
  const [floorNumber, setFloorNumber] = useState<any>("G");
  const typeKey = type === "pickup" ? "movingFrom" : "movingTo";
  const addressKey =
    type === "pickup" ? "movingFromAddress" : "movingToAddress";
  const [address, setAddress] = useState(searchParams[addressKey]);

  return (
    <PickupStepper
      title={type === "pickup" ? "Pickup Details" : "Drop Details "}
      onContinue={() => {
        router.push({
          pathname: type === "pickup" ? "/dropDetails" : "/moveOptions",
          params: {
            ...searchParams,
            [`${typeKey}PropertyType`]: selected,
            [`${typeKey}HouseType`]: houseType,
            [`${typeKey}LiftAvailable`]: liftAvailable,
            [`${typeKey}Floor`]: floorNumber,
            [addressKey]: address,
          },
        });
      }}
      endButtonProps={
        {
          disabled:
            !address ||
            (selected === "house" && !houseType) ||
            (selected === "house" &&
              houseType === "apartment" &&
              !liftAvailable) ||
            (selected === "office" && !liftAvailable),
        } as any
      }
    >
      <Box gap={3}>
        <TextInput
          id={addressKey}
          label="Address"
          multiline
          style={{ paddingTop: 5 }}
          inputStyle={{
            fontSize: 16,
            height: 80,
            ...(isAndroid ? { textAlignVertical: "top" } : {}),
          }}
          placeholder="Pickup address"
          defaultValue={searchParams[addressKey] as any}
          onChangeText={setAddress}
        />
        <Box>
          <Text variant="titleSmall" style={{ fontFamily: "SatoshiBold" }}>
            Property Type
          </Text>
          <Text variant="titleSmall" style={{ fontFamily: "Satoshi" }}>
            Please select your pickup property
          </Text>
        </Box>
        <Box
          direction="row"
          alignItems="center"
          gap={Platform.select({ ios: 2, android: 0 })}
        >
          {PropertyTypes.map((propType) => (
            <BaseButton
              key={propType.value}
              style={{ flex: 1, ...shadowProps }}
              onPress={() => {
                setHouseType("");
                setFloorNumber("G");
                setLiftAvailable("");
                setSelected(propType.value);
              }}
            >
              <Box
                alignItems="center"
                justifyContent="center"
                p={2}
                gap={0.5}
                borderWidth={1}
                borderColor={
                  selected === propType.value
                    ? theme.colors.primary
                    : (theme.colors as any).white
                }
                background={
                  selected === propType.value
                    ? (theme.colors as any).lightBlue100
                    : "white"
                }
                borderRadius={8}
              >
                {propType.icon}
                <Text
                  variant="titleSmall"
                  style={{
                    fontFamily: "SatoshiBold",
                    color: (theme.colors as any).darkBlue,
                  }}
                >
                  {propType.label}
                </Text>
              </Box>
            </BaseButton>
          ))}
        </Box>
        {selected !== "warehouse" && (
          <Box
            height={Platform.select({ android: 0.5, ios: 0.25 })}
            width="100%"
            background={(theme.colors as any).inputBorder}
            my={Platform.select({ android: 0.5, ios: 1 })}
          />
        )}
        {selected === "house" && (
          <Box direction="row" alignItems="center" gap={2}>
            {HouseTypes.map((ht) => (
              <BaseButton key={ht.value} onPress={() => setHouseType(ht.value)}>
                <Box
                  alignItems="center"
                  justifyContent="center"
                  py={1}
                  px={2.5}
                  borderWidth={1}
                  borderColor={
                    houseType === ht.value
                      ? theme.colors.primary
                      : (theme.colors as any).lightGrey
                  }
                  background={
                    houseType === ht.value
                      ? (theme.colors as any).lightBlue100
                      : (theme.colors as any).lightGrey
                  }
                  borderRadius={8}
                >
                  <Text
                    variant="titleSmall"
                    style={{
                      fontFamily: "SatoshiBold",
                      color: (theme.colors as any).darkBlue,
                    }}
                  >
                    {ht.label}
                  </Text>
                </Box>
              </BaseButton>
            ))}
          </Box>
        )}
        {houseType === "apartment" || selected === "office" ? (
          <Box
            mt={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text
              variant="titleSmall"
              style={{
                fontFamily: "SatoshiBold",
              }}
            >
              Cargo Lift Available
            </Text>
            <Box direction="row" alignItems="center" gap={1}>
              {["Yes", "No"].map((c) => (
                <BaseButton
                  key={c}
                  onPress={() => setLiftAvailable(c.toLowerCase())}
                >
                  <Box
                    alignItems="center"
                    justifyContent="center"
                    py={0.5}
                    px={4}
                    borderWidth={1}
                    borderColor={
                      liftAvailable === c.toLowerCase()
                        ? theme.colors.primary
                        : (theme.colors as any).lightGrey
                    }
                    background={
                      liftAvailable === c.toLowerCase()
                        ? (theme.colors as any).lightBlue100
                        : (theme.colors as any).lightGrey
                    }
                    borderRadius={100}
                  >
                    <Text
                      variant="titleSmall"
                      style={{
                        fontFamily: "SatoshiBold",
                        color: (theme.colors as any).darkBlue,
                      }}
                    >
                      {c}
                    </Text>
                  </Box>
                </BaseButton>
              ))}
            </Box>
          </Box>
        ) : null}
        {liftAvailable === "no" && (
          <Box
            mt={Platform.select({ android: 1.5, ios: 2 })}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text
              variant="titleSmall"
              style={{
                fontFamily: "SatoshiBold",
              }}
            >
              What is your floor number?
            </Text>
            <Box>
              <QuantityInput
                containerProps={{ flex: 1 }}
                qty={floorNumber}
                onDecrease={() => {
                  const num = parseInt(floorNumber) || 0;
                  setFloorNumber(num - 1 <= 0 ? "G" : num - 1);
                }}
                onIncrease={() => {
                  const num = parseInt(floorNumber) || 0;
                  setFloorNumber(num + 1);
                }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </PickupStepper>
  );
};

export default PickupDetails;
