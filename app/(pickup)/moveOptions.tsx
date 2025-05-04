import React from "react";
import Box from "@/components/Box";
import PickupStepper from "@/components/PickupStepper";
import { Text, useTheme } from "react-native-paper";
import BaseButton from "@/components/BaseButton";
import { shadowProps } from "@/utils";
import { Image } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

const MoveOps = [
  {
    title: "Move Everything",
    value: "everything",
    description: "Homes, Shops, Offices & more",
    image: require("@/assets/images/moving-van.png"),
  },
  {
    title: "Move a Few Items",
    value: "items",
    description: "Furniture, Appliances, Home Goods & more",
    image: require("@/assets/images/appliances.png"),
  },
];

const MoveOptions = () => {
  const theme = useTheme();
  const searchParams = useLocalSearchParams();

  const onMoveOpSelect = (moveOp: string) => {
    if (moveOp === "everything") {
      if (searchParams.movingFromPropertyType === "house") {
        router.push({
          pathname: "/spaces",
          params: {
            ...searchParams,
            movingCategory: moveOp,
          },
        });
      } else {
        router.push({
          pathname: "/costEstimation",
          params: {
            ...searchParams,
            movingCategory: moveOp,
          },
        });
      }
    } else {
      router.push({
        pathname: "/itemCategorySelection",
        params: {
          ...searchParams,
          movingCategory: moveOp,
        },
      });
    }
  };

  return (
    <PickupStepper title="" onContinue={() => {}} endButton={<></>}>
      <Box gap={4}>
        <Text
          variant="headlineMedium"
          style={{ textAlign: "center", fontFamily: "SatoshiBold" }}
        >
          What would you like to move?
        </Text>
        {MoveOps.map((moveOp, i) => (
          <BaseButton
            style={shadowProps}
            onPress={() => onMoveOpSelect(moveOp.value)}
            key={moveOp.value}
          >
            <Box
              borderWidth={1}
              borderColor={(theme.colors as any).inputBorder}
              background={(theme.colors as any).lightGrey}
              justifyContent="center"
              alignItems="center"
              borderRadius={8}
              px={2}
              pb={2}
            >
              <Image
                resizeMode="contain"
                style={{
                  height: i === 0 ? 180 : 165,
                }}
                source={moveOp.image}
              />
              <Box mt={i === 0 ? -3 : -1} gap={0.5} alignItems="center">
                <Text
                  variant="titleLarge"
                  style={{
                    fontFamily: "SatoshiBlack",
                    color: (theme.colors as any).darkBlue,
                  }}
                >
                  {moveOp.title}
                </Text>
                <Text
                  variant="titleSmall"
                  style={{
                    fontFamily: "Satoshi",
                    lineHeight: 18,
                  }}
                >
                  {moveOp.description}
                </Text>
              </Box>
            </Box>
          </BaseButton>
        ))}
      </Box>
    </PickupStepper>
  );
};

export default MoveOptions;
