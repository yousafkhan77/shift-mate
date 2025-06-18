import { useAddFieldsMutation } from "@/api";
import {
  Delivery,
  useGetCurrentDeliveryQuery,
  useGetNearbyDeliveriesQuery,
  useSendDeliveryRequestMutation,
} from "@/api/delivery";
import { AppTheme } from "@/app/_layout";
import { getCurrentLocation, isAndroid } from "@/utils";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import * as Location from "expo-location";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { FlatList } from "react-native-actions-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";
import Toast from "react-native-toast-message";
import BottomSheet from "./BottomSheet";
import Box from "./Box";
import Button from "./Button";
import DriverDeliveryListItem from "./DriverDeliveryListItem";
import IconButton from "./IconButton";
import TextInput from "./TextInput";

const { height, width } = Dimensions.get("window");

const DriverView = () => {
  const ref = useRef<any>(null);
  const isFocused = useIsFocused();
  const mapRef = useRef<MapView | null>(null);
  const theme = useTheme<AppTheme>();
  const [fare, setFare] = useState("");
  const [isMapReady, setIsMapReady] = useState(false);
  const [sentRequests, setSentRequests] = useState<string[]>([]);
  const [overlay, setOverlay] = useState(false);
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const { data: currentDelivery } = useGetCurrentDeliveryQuery(undefined, {
    pollingInterval: 5000,
  });
  const { data: nearbyDeliveries = [], isLoading } =
    useGetNearbyDeliveriesQuery(
      {
        lat: location?.coords?.latitude ?? 0,
        lon: location?.coords?.longitude ?? 0,
      },
      { skip: !location, pollingInterval: 5000 }
    );
  const [addFields] = useAddFieldsMutation();
  const [sendDeliveryRequest, { isLoading: isSending }] =
    useSendDeliveryRequestMutation();

  useEffect(() => {
    async function getDriverLoaction() {
      const loc = await getCurrentLocation();
      if (loc) {
        addFields({
          location: `${loc.coords.latitude},${loc.coords.longitude}`,
        });
        setLocation(loc);
      } else {
        setOverlay(true);
      }
    }

    getDriverLoaction();
    setTimeout(() => {
      if (ref.current) ref.current.show();
    }, 300);
  }, []);

  const fitToCoordinates = () => {
    if (mapRef.current && location)
      mapRef.current.animateToRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.00125,
          longitudeDelta: 0.00125,
        },
        500
      );
  };

  useEffect(() => {
    if (location) {
      if (isAndroid) {
        if (isMapReady) setTimeout(fitToCoordinates, 200);
      } else {
        fitToCoordinates();
      }
    }
  }, [location, isMapReady]);

  useEffect(() => {
    if (currentDelivery && isFocused)
      router.push(`/booking/${currentDelivery.deliveryID}`);
  }, [currentDelivery]);

  const offerFare = () => {
    if (!delivery) return;
    sendDeliveryRequest({
      deliveryID: delivery.deliveryID,
      deliveryFare: fare,
    }).then((res: any) => {
      if (!res.error) {
        setDelivery(null);
        setSentRequests([...sentRequests, delivery.deliveryID]);
        Toast.show({ type: "success", text1: res.data.message });
      }
    });
  };

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
      <Box height="100%" width="100%" position="relative">
        {overlay && (
          <Box
            position="absolute"
            top={0}
            left={0}
            zIndex={1}
            height={height}
            width={width}
            alignItems="center"
            justifyContent="center"
            p={0.5}
            background="rgba(0, 0, 0, 0.6)"
          >
            <Text
              variant="titleLarge"
              style={{
                fontFamily: "SatoshiBold",
                color: "white",
                textAlign: "center",
              }}
            >
              Location access denied. Please allow location access to view
              bookings.
            </Text>
          </Box>
        )}
        <MapView
          key={location ? 2 : 1}
          onMapReady={() => setIsMapReady(true)}
          style={{
            width: "100%",
            height: "100%",
          }}
          ref={mapRef}
          zoomControlEnabled={false}
        >
          {location && (
            <Marker
              title="Me"
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
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
        backgroundInteractionEnabled
        isModal={false}
      >
        <Box gap={2} minHeight={height * 0.35}>
          <Box px={3} gap={2} pt={1} pb={1} flex={delivery ? 1 : undefined}>
            <Box
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box direction="row" alignItems="center" gap={0.75}>
                {delivery && (
                  <IconButton
                    style={{ marginTop: 2 }}
                    onPress={() => setDelivery(null)}
                  >
                    <Feather
                      name="chevron-left"
                      size={22}
                      color={theme.colors.spaceBlack}
                    />
                  </IconButton>
                )}
                <Text style={{ fontSize: 18, fontFamily: "SatoshiBold" }}>
                  {delivery ? "Delivery Fare" : "All Deliveries"}
                </Text>
              </Box>
              {delivery && (
                <Text style={{ fontSize: 18, fontFamily: "SatoshiBold" }}>
                  PKR {delivery.deliveryFare}
                </Text>
              )}
            </Box>
            {delivery ? (
              <Box
                flex={1}
                gap={2}
                px={1}
                py={2}
                justifyContent="space-between"
              >
                <Box gap={2}>
                  <Box gap={1.25} direction="row" alignItems="center">
                    <FontAwesome6 name="location-dot" size={22} color="green" />
                    <Text style={{ fontFamily: "Satoshi" }}>
                      {delivery.pickup?.address}
                    </Text>
                  </Box>
                  <Box
                    height={10}
                    width={1}
                    ml={0.75}
                    my={-1}
                    background="black"
                  />
                  <Box gap={1.25} direction="row" alignItems="center">
                    <FontAwesome6 name="location-dot" size={22} color="red" />
                    <Text style={{ fontFamily: "Satoshi" }}>
                      {delivery.dropoff?.address}
                    </Text>
                  </Box>
                </Box>
                <TextInput
                  keyboardType="number-pad"
                  id="fare"
                  defaultValue={String(fare)}
                  onChangeText={(text) => {
                    setFare(text);
                  }}
                  left={
                    <Box pl={1.25}>
                      <Text
                        variant="labelMedium"
                        style={{
                          marginTop: 2,
                          fontFamily: "SatoshiBold",
                          color: theme.colors.spaceBlack,
                        }}
                      >
                        PKR
                      </Text>
                    </Box>
                  }
                />
                <Button
                  disabled={!fare}
                  loading={isSending}
                  onPress={offerFare}
                  mode="contained"
                >
                  Offer Fare
                </Button>
              </Box>
            ) : (
              <FlatList
                ListEmptyComponent={
                  <Box
                    minHeight={250}
                    justifyContent="center"
                    alignItems="center"
                  >
                    {isLoading ? (
                      <ActivityIndicator />
                    ) : (
                      <Box mt={-4} gap={1}>
                        <LottieView
                          style={{ height: 200, width: 200 }}
                          source={require("@/assets/lottie/empty-box.json")}
                          autoPlay
                          loop
                        />
                        <Text
                          variant="titleMedium"
                          style={{ fontFamily: "Satoshi" }}
                        >
                          No new delivery requests
                        </Text>
                      </Box>
                    )}
                  </Box>
                }
                showsVerticalScrollIndicator={false}
                data={nearbyDeliveries.filter(
                  (nd) => !sentRequests.includes(nd.deliveryID)
                )}
                keyExtractor={(item) => item.deliveryID}
                renderItem={({ item }) => (
                  <DriverDeliveryListItem
                    {...item}
                    onPress={() => {
                      setDelivery(item);
                      setFare(String(item.deliveryFare));
                    }}
                  />
                )}
              />
            )}
          </Box>
        </Box>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default DriverView;
