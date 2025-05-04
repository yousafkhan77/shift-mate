import Box from "@/components/Box";
import PickupStepper from "@/components/PickupStepper";
import QuantityInput from "@/components/QuantityInput";
import SearchInput from "@/components/SearchInput";
import { AllItems } from "@/utils";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { DeviceEventEmitter, Dimensions, FlatList } from "react-native";
import { Text, useTheme } from "react-native-paper";

const { height } = Dimensions.get("window");

const ItemSearch = () => {
  const theme = useTheme();
  const searchParams = useLocalSearchParams();
  const [itemSelection, setItemSelection] = useState<{
    [key: string]: number;
  }>((searchParams as any) || {});
  const [search, setSearch] = useState("");

  return (
    <PickupStepper
      title="Search Results"
      onContinue={() => {
        DeviceEventEmitter.emit("item_selection_change", {
          itemCatsMap: Object.keys(itemSelection).reduce((acc: any, curr) => {
            const [itemCategory, ...id] = curr.split("-");
            const joinedID = id.join("-");

            if (acc[itemCategory]) {
              acc[itemCategory] = {
                ...acc[itemCategory],
                [joinedID]: itemSelection[curr],
              };
            } else {
              acc[itemCategory] = { [joinedID]: itemSelection[curr] };
            }

            return acc;
          }, {}),
        });
        router.back();
      }}
      endButtonProps={
        { disabled: Object.keys(itemSelection).length === 0 } as any
      }
    >
      <Box gap={3}>
        <SearchInput
          autoFocus
          placeholder="Search items"
          onChangeText={setSearch}
        />
        <Box height={height / 1.5} pb={1.5}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={AllItems.filter((item) =>
              search
                ? item.title.toLowerCase().includes(search.toLowerCase())
                : false
            )}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Box
                direction="row"
                alignItems="center"
                minHeight={50}
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
                      const id = `${item.category}-${item.id}`;
                      const existingCount =
                        parseInt((itemSelection[id] as any) || "0") || 0;
                      if (existingCount - 1 <= 0) {
                        delete tmp[id];
                      } else {
                        tmp = { ...tmp, [id]: existingCount - 1 };
                      }
                      setItemSelection(tmp);
                    }}
                    onIncrease={() => {
                      const id = `${item.category}-${item.id}`;
                      const existingCount =
                        parseInt((itemSelection[id] as any) || "0") || 0;
                      setItemSelection({
                        ...itemSelection,
                        [id]: existingCount + 1,
                      });
                    }}
                    qty={
                      parseInt(
                        (itemSelection[`${item.category}-${item.id}`] as any) ||
                          "0"
                      ) || 0
                    }
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

export default ItemSearch;
