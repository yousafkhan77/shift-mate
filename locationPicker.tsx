import {
  Location,
  useAddAddressMutation,
  useLazySearchCoordinatesQuery,
  useSearchLocationQuery,
  useUpdateAddressMutation,
} from "@/api";
import BaseButton from "@/components/BaseButton";
import BottomSheet from "@/components/BottomSheet";
import Box from "@/components/Box";
import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import SearchInput from "@/components/SearchInput";
import useDebounce from "@/hooks/useDebounce";
import { getCurrentLocation, isAndroid } from "@/utils";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  DeviceEventEmitter,
  Dimensions,
  Image,
  Platform,
  Pressable,
} from "react-native";
import { FlatList } from "react-native-actions-sheet";
import * as Animatable from "react-native-animatable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { AppTheme } from "./_layout";

const { height } = Dimensions.get("window");

const LocationPicker = () => {
  const {
    emit,
    addressID,
    location: defaultLocation,
    locationType,
    event = "location_selected",
  } = useLocalSearchParams();
  const ref = useRef<any>(null);
  const mapRef = useRef<MapView | null>(null);
  const theme = useTheme<AppTheme>();
  const safeAreaInsets = useSafeAreaInsets();
  const [isMapReady, setIsMapReady] = useState(false);
  const [locLoading, setLocLoading] = useState(false);
  const [expand, setExpand] = useState(!defaultLocation);
  const [query, setQuery] = useState("");
  const [location, setLoaction] = useState<Location | null>(
    defaultLocation && defaultLocation !== "current"
      ? JSON.parse(defaultLocation as any)
      : null
  );
  const deferredQuery = useDebounce(query, 500);
  const [searchCoordinates, { isFetching: isSearching }] =
    useLazySearchCoordinatesQuery();
  const [addAddress, { isLoading: isAdding }] = useAddAddressMutation();
  const [updateAddress, { isLoading: isUpdating }] = useUpdateAddressMutation();
  const { currentData: locations = [], isFetching } = useSearchLocationQuery(
    deferredQuery,
    {
      skip: Boolean(
        !deferredQuery || (deferredQuery && deferredQuery.length < 3)
      ),
    }
  );

  const getDefaultLocation = async () => {
    setExpand(true);
    setLocLoading(true);
    const loc = await getCurrentLocation();
    setLocLoading(false);
    if (!loc) {
      Alert.alert(
        "Location Permission Error",
        "Location access denied. To use your current location, please enable location permissions in your settings."
      );
    } else {
      searchCoordinates(`${loc.coords.latitude},${loc.coords.longitude}`).then(
        (res: any) => {
          if (res.data && res.data.length > 0) {
            setQuery("");
            setExpand(false);
            setLoaction(res.data[0]);
          }
        }
      );
    }
  };

  useEffect(() => {
    if (defaultLocation === "current" && !location) {
      getDefaultLocation();
    }

    setTimeout(() => {
      if (ref.current) ref.current.show();
    }, 300);
  }, []);

  useEffect(() => {
    if (location && isMapReady) {
      const onFit = () => {
        if (mapRef.current)
          mapRef.current.animateToRegion(
            {
              latitude: Number(location.coordinates.lat),
              longitude: Number(location.coordinates.lon),
              latitudeDelta: 0.00125,
              longitudeDelta: 0.00125,
            },
            500
          );
      };
      if (isAndroid) {
        setTimeout(onFit, 200);
      } else {
        onFit();
      }
    }
  }, [location, isMapReady]);

  const onSave = () => {
    if (!location) return;
    const payload = {
      ...location,
      addressFull: location.formatted,
      coordinates:
        `${location.coordinates.lat},${location.coordinates.lon}` as any,
    };
    const onFinish = (res: any) => {
      if (!res.error) {
        Toast.show({
          type: "tomatoToast",
          text1: res.data.message,
        });
        router.back();
      }
    };

    if (addressID) {
      updateAddress({ ...payload, addressID: addressID as string }).then(
        onFinish
      );
    } else {
      addAddress(payload).then(onFinish);
    }
  };

  const onSaveLocation = () => {
    if (!location) return;
    if (emit) {
      const { coordinates, ...rest } = location;
      DeviceEventEmitter.emit(event as string, {
        ...rest,
        ...coordinates,
        locationType,
      });
      router.back();
    } else {
      onSave();
    }
  };

  const renderItem = ({ item }: { item: Location; index: number }) => {
    return (
      <Animatable.View
        animation={{ 0: { translateY: -20 }, 1: { translateY: 0 } }}
        duration={350}
      >
        <Pressable
          onPress={() => {
            setQuery("");
            setExpand(false);
            setLoaction(item);
          }}
        >
          {() => (
            <Box
              py={1.875}
              px={2.5}
              direction="row"
              alignItems="center"
              gap={1.5}
            >
              <Octicons
                name="location"
                size={20}
                color={theme.colors.spaceBlack}
              />
              <Box flex={1} pr={3}>
                <Text
                  numberOfLines={1}
                  variant="titleSmall"
                  style={{ fontFamily: "SatoshiBold" }}
                >
                  {item.address}
                </Text>
                <Text
                  numberOfLines={1}
                  variant="titleSmall"
                  style={{ fontFamily: "Satoshi" }}
                >
                  {item.town || item.city}
                </Text>
              </Box>
            </Box>
          )}
        </Pressable>
      </Animatable.View>
    );
  };

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
      <Box height="100%" width="100%" position="relative">
        <Box
          position="absolute"
          top={Platform.select({
            ios: safeAreaInsets.top - 5,
            android: safeAreaInsets.top + 20,
          })}
          left={16}
          zIndex={1}
          alignItems="center"
          justifyContent="center"
          borderRadius={1000}
          p={0.5}
          background="white"
        >
          <IconButton onPress={() => router.back()}>
            <AntDesign
              name="close"
              size={22}
              color={(theme.colors as any).iconGrey100}
            />
          </IconButton>
        </Box>
        <MapView
          ref={mapRef}
          onMapReady={() => setIsMapReady(true)}
          style={{
            width: "100%",
            height: "100%",
          }}
          zoomControlEnabled={false}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location ? Number(location.coordinates.lat) : 0,
                longitude: location ? Number(location.coordinates.lon) : 0,
              }}
            />
          )}
        </MapView>
      </Box>
      <BottomSheet
        ref={ref}
        initialSnapIndex={1}
        snapPoints={[15, 100]}
        closable={false}
        isModal={false}
        backgroundInteractionEnabled
      >
        <Box
          gap={2}
          minHeight={Platform.select({
            ios: addressID ? height * 0.18 : height * 0.15,
            android: addressID ? height * 0.32 : height * 0.265,
          })}
        >
          <Box px={3} gap={2} pt={1}>
            {(!expand && !location) || addressID ? (
              <Text style={{ fontSize: 18, fontFamily: "SatoshiBold" }}>
                {addressID ? "Edit your address" : "Add a new address"}
              </Text>
            ) : null}
            {location && !expand ? (
              <Box
                pr={3}
                py={1}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box direction="row" alignItems="center" gap={2}>
                  <Octicons
                    name="location"
                    size={24}
                    color={theme.colors.spaceBlack}
                  />
                  <Box flex={1} pr={3}>
                    <Text
                      numberOfLines={1}
                      variant="titleMedium"
                      style={{ fontFamily: "SatoshiBold" }}
                    >
                      {location.address}
                    </Text>
                    <Text
                      numberOfLines={1}
                      variant="titleSmall"
                      style={{
                        fontFamily: "Satoshi",
                        color: theme.colors.spaceGrey,
                      }}
                    >
                      {location.town || location.city}
                    </Text>
                  </Box>
                </Box>
                <BaseButton onPress={() => setExpand(true)}>
                  <Octicons
                    name="pencil"
                    size={23}
                    color={theme.colors.spaceBlack}
                  />
                </BaseButton>
              </Box>
            ) : (
              <SearchInput
                autoFocus
                readOnly={isSearching || locLoading}
                autoCorrect={false}
                autoCapitalize="none"
                autoComplete="off"
                placeholder="Enter your address"
                onChangeText={setQuery}
              />
            )}
          </Box>
          {expand ? (
            <Box
              height={Platform.select({
                ios: height * 0.35,
                android: height * 0.45,
              })}
            >
              <FlatList
                data={locations}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                ListEmptyComponent={
                  isFetching || isSearching || locLoading ? (
                    <Box
                      minHeight={300}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <ActivityIndicator size="small" />
                    </Box>
                  ) : (
                    <Box
                      px={2}
                      pt={(height * 0.015) / 8}
                      textAlign="center"
                      justifyContent="center"
                      alignItems="center"
                      gap={2}
                    >
                      {!query && (
                        <Image
                          resizeMode="contain"
                          style={{ width: 140, height: 140 }}
                          source={require("@/assets/images/3V1.png")}
                        />
                      )}
                      <Text
                        style={{
                          fontSize: 15,
                          color: theme.colors.iconGrey,
                          fontFamily: "SatoshiMedium",
                          textAlign: "center",
                        }}
                      >
                        {query
                          ? `We couldn't find this address. Check and try again.`
                          : "Enter an address to add as a pickup or dropoff location"}
                      </Text>
                      <Button
                        onPress={getDefaultLocation}
                        textColor={theme.colors.iconGrey}
                        mode="text"
                      >
                        Use my current location
                      </Button>
                    </Box>
                  )
                }
              />
            </Box>
          ) : (
            <Box
              borderTopWidth={1}
              borderTopColor={(theme.colors as any).borderGrey}
              px={3}
              pt={2}
            >
              <Button
                loading={isAdding || isUpdating}
                mode="contained"
                disabled={!location}
                onPress={onSaveLocation}
              >
                {addressID ? "Save and continue" : "Add address details"}
              </Button>
            </Box>
          )}
        </Box>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default LocationPicker;
