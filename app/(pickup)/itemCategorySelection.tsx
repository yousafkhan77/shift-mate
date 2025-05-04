import React, { useEffect, useState } from "react";
import Box from "@/components/Box";
import PickupStepper from "@/components/PickupStepper";
import SearchInput from "@/components/SearchInput";
import { Text, useTheme } from "react-native-paper";
import BaseButton from "@/components/BaseButton";
import {
  DeviceEventEmitter,
  Image,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { ItemCategories, shadowProps } from "@/utils";

const ItemCategorySelection = () => {
  const theme = useTheme();
  const searchParams = useLocalSearchParams();
  const [itemCatsMap, setItemCatsMap] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    DeviceEventEmitter.addListener(
      "item_selection_change",
      ({ itemCategory, itemSelection, itemCatsMap: iCatMap }) => {
        if (iCatMap) {
          setItemCatsMap(iCatMap);
        } else {
          setItemCatsMap({ ...itemCatsMap, [itemCategory]: itemSelection });
        }
      }
    );

    return () => {
      DeviceEventEmitter.removeAllListeners("item_selection_change");
    };
  }, [itemCatsMap]);

  return (
    <PickupStepper
      title="Choose Your Items"
      onContinue={() => {
        router.push({
          pathname: "/costEstimation",
          params: { ...searchParams, itemCatsMap: JSON.stringify(itemCatsMap) },
        });
      }}
      endButtonProps={
        {
          disabled: !Object.keys(itemCatsMap).find(
            (k) => Object.keys(itemCatsMap[k]).length > 0
          ),
        } as any
      }
    >
      <Box gap={3}>
        <Text variant="titleMedium" style={{ fontFamily: "Satoshi" }}>
          Choose any item you'd like to include in your move
        </Text>
        <BaseButton
          onPress={() =>
            router.push({
              pathname: "/itemSearch",
              params: Object.keys(itemCatsMap).reduce((acc, curr) => {
                acc = {
                  ...acc,
                  ...Object.keys(itemCatsMap[curr]).reduce((a: any, c) => {
                    a[`${curr}-${c}`] = itemCatsMap[curr][c];
                    return a;
                  }, {}),
                };
                return acc;
              }, {}),
            })
          }
        >
          <View style={{ pointerEvents: "none" }}>
            <SearchInput placeholder="Search items" />
          </View>
        </BaseButton>
        <Box direction="row" flexWrap="wrap" gap={2}>
          {ItemCategories.map((itemCategory) => (
            <BaseButton
              style={{ width: "47%", height: 150 }}
              onPress={() => {
                router.push({
                  pathname: "/itemSelection",
                  params: {
                    itemCategory: itemCategory.value,
                    ...itemCatsMap[itemCategory.value],
                  },
                });
              }}
              key={itemCategory.value}
            >
              <Box
                height="100%"
                background={(theme.colors as any).lightBlue}
                borderRadius={8}
                justifyContent="space-between"
                py={Platform.select({ android: 1.5, ios: 2 })}
                px={Platform.select({ android: 0, ios: 2 })}
                position="relative"
              >
                {itemCatsMap[itemCategory.value] &&
                  Object.keys(itemCatsMap[itemCategory.value]).length > 0 && (
                    <Box
                      position="absolute"
                      top={Platform.select({ android: -3, ios: -1 })}
                      right={Platform.select({ android: -3, ios: -1 })}
                      background="white"
                      justifyContent="center"
                      alignItems="center"
                      borderRadius={1000}
                      height={Platform.select({ android: 33, ios: 35 })}
                      width={Platform.select({ android: 33, ios: 35 })}
                      boxStyle={shadowProps}
                    >
                      <Text
                        variant="titleSmall"
                        style={{
                          fontFamily: "SatoshiBlack",
                          color: (theme.colors as any).darkBlue,
                        }}
                      >
                        {Object.keys(itemCatsMap[itemCategory.value]).reduce(
                          (acc, curr) =>
                            (acc += parseInt(
                              itemCatsMap[itemCategory.value][curr]
                            )),
                          0
                        )}
                      </Text>
                    </Box>
                  )}
                <Box gap={0.5} px={Platform.select({ ios: 0, android: 1.5 })}>
                  <Text
                    variant="titleMedium"
                    style={{
                      fontFamily: "SatoshiBlack",
                      color: (theme.colors as any).darkBlue,
                    }}
                  >
                    {itemCategory.label}
                  </Text>
                  <Text
                    variant="titleSmall"
                    style={{
                      fontFamily: "Satoshi",
                      lineHeight: 18,
                    }}
                  >
                    {itemCategory.description}
                  </Text>
                </Box>
                <Image
                  resizeMode="contain"
                  style={{
                    height: Platform.select({ android: 52, ios: 60 }),
                  }}
                  source={itemCategory.image}
                />
              </Box>
            </BaseButton>
          ))}
        </Box>
      </Box>
    </PickupStepper>
  );
};

export default ItemCategorySelection;
