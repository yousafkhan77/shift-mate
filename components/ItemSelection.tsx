import React, { useState } from "react";
import Box from "@/components/Box";
import PickupStepper from "@/components/PickupStepper";
import SearchInput from "@/components/SearchInput";
import { Text, useTheme } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import { ItemCategories } from "@/utils";
import { DeviceEventEmitter, FlatList, Image, Dimensions } from "react-native";
import QuantityInput from "@/components/QuantityInput";

const { height } = Dimensions.get("window");

const ItemSelection = () => {
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const { itemCategory, ...iSelection } = useLocalSearchParams();
  const [itemSelection, setItemSelection] = useState<{
    [key: string]: number;
  }>((iSelection as any) || {});
  const ItemCategory = ItemCategories.find((i) => i.value === itemCategory);

  return (
    <PickupStepper
      title="Choose Your Items"
      onContinue={() => {
        DeviceEventEmitter.emit("item_selection_change", {
          itemCategory,
          itemSelection,
        });
        router.back();
      }}
      endButtonProps={
        { disabled: Object.keys(itemSelection).length === 0 } as any
      }
    >
      <Box gap={3}>
        {ItemCategory && (
          <Box
            background={(theme.colors as any).lightBlue}
            borderRadius={8}
            px={2}
            pt={1.5}
            pb={1.25}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              resizeMode="contain"
              style={{
                width: 60,
                height: 60,
              }}
              source={ItemCategory?.image}
            />
            <Box gap={0.675} alignItems="center">
              <Text
                variant="titleLarge"
                style={{
                  fontFamily: "SatoshiBlack",
                  color: (theme.colors as any).darkBlue,
                }}
              >
                {ItemCategory?.label}
              </Text>
              <Text
                variant="titleSmall"
                style={{
                  fontFamily: "Satoshi",
                  lineHeight: 18,
                }}
              >
                {Object.keys(itemSelection).reduce(
                  (acc, curr) => (acc += parseInt(itemSelection[curr] as any)),
                  0
                )}{" "}
                items added
              </Text>
            </Box>
            <Box width={60} />
          </Box>
        )}
        <SearchInput placeholder="Search items" onChangeText={setSearch} />
        <Box height={height / 1.875}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={(ItemCategory?.items || []).filter((item) =>
              item.title.toLowerCase().includes(search.toLowerCase())
            )}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Box
                minHeight={50}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "Satoshi",
                    color: (theme.colors as any).darkBlue,
                  }}
                >
                  {item.title}
                </Text>
                <Box>
                  <QuantityInput
                    onDecrease={() => {
                      let tmp = { ...itemSelection };
                      const existingCount =
                        parseInt((itemSelection[item.id] as any) || "0") || 0;
                      if (existingCount - 1 <= 0) {
                        delete tmp[item.id];
                      } else {
                        tmp = { ...tmp, [item.id]: existingCount - 1 };
                      }
                      setItemSelection(tmp);
                    }}
                    onIncrease={() => {
                      const existingCount =
                        parseInt((itemSelection[item.id] as any) || "0") || 0;
                      setItemSelection({
                        ...itemSelection,
                        [item.id]: existingCount + 1,
                      });
                    }}
                    qty={parseInt((itemSelection[item.id] as any) || "0") || 0}
                    hideOnZero
                  />
                </Box>
              </Box>
            )}
          />
        </Box>
      </Box>
    </PickupStepper>
  );
};

export default ItemSelection;
