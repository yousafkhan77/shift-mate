import Box from "@/components/Box";
import Button from "@/components/Button";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { Animated, Dimensions, Image, Platform, View } from "react-native";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const pages = [
  {
    id: 1,
    image: require("@/assets/images/xW.png"),
    title: "Pickup & drop anywhere",
  },
  {
    id: 2,
    image: require("@/assets/images/os.png"),
    title: "Track location of your deliveries",
  },
  {
    id: 3,
    image: require("@/assets/images/XQ.png"),
    title: "Safe and Reliable Delivery",
  },
];

export default function Onboarding() {
  const scrollViewRef = useRef<any>(null);
  const safeAreaInsets = useSafeAreaInsets();
  const [currentPageIndex, setCurrentPageIndex] = React.useState(0);

  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentPageIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentPageIndex + 1;
    if (nextSlideIndex != pages.length) {
      const offset = nextSlideIndex * width;
      scrollViewRef.current?.scrollTo({
        x: offset,
        animated: true,
      });
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = pages.length - 1;
    const offset = lastSlideIndex * width;
    scrollViewRef.current?.scrollTo({
      x: offset,
      animated: true,
    });
    setCurrentPageIndex(lastSlideIndex);
  };

  return (
    <Box
      flex={1}
      background="white"
      pt={safeAreaInsets.top / 8 + 1.25}
      pb={Platform.select({
        ios: safeAreaInsets.top / 8 - 1.25,
        android: safeAreaInsets.top / 8,
      })}
    >
      <StatusBar style="light" />
      <Box alignSelf="center">
        <Text variant="displaySmall" style={{ fontFamily: "SatoshiBlack" }}>
          ShiftMate
        </Text>
      </Box>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={updateCurrentSlideIndex}
        showsHorizontalScrollIndicator={false}
      >
        {pages.map((page) => (
          <View
            key={page.id}
            style={{
              flex: 1,
              width: width,
              justifyContent: "center",
            }}
          >
            <Box gap={2.5} alignItems="center" justifyContent="center" px={2.5}>
              <Image
                style={Platform.select({
                  android: { width: 330, height: 330 },
                  ios: { width: 400, height: 400 },
                })}
                resizeMode="contain"
                source={page.image}
              />
              <Text
                variant="displaySmall"
                style={{
                  fontFamily: "SatoshiBold",
                  textAlign: "center",
                }}
              >
                {page.title}
              </Text>
              <Box
                alignSelf="center"
                direction="row"
                alignItems="center"
                gap={1.25}
              >
                {pages.map((page, i) => (
                  <View
                    key={page.id}
                    style={{
                      backgroundColor:
                        currentPageIndex === i ? "#284DB8" : "#DBD9D3",
                      width: currentPageIndex === i ? 11 : 10,
                      height: currentPageIndex === i ? 11 : 10,
                      borderRadius: 1000,
                    }}
                  />
                ))}
              </Box>
            </Box>
          </View>
        ))}
      </Animated.ScrollView>
      <Box
        px={2.5}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        {currentPageIndex == pages.length - 1 ? (
          <>
            <View />
            <Button
              textColor="white"
              mode="contained"
              style={{
                borderRadius: 100,
                height: 46,
                justifyContent: "center",
                minWidth: 130,
              }}
              onPress={() => router.push("/register")}
              labelStyle={{
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              Get Started
            </Button>
          </>
        ) : (
          <>
            <Button
              textColor="black"
              mode="text"
              labelStyle={{
                fontSize: 16,
                fontWeight: 700,
              }}
              onPress={skip}
            >
              Skip
            </Button>
            <Button
              textColor="white"
              mode="contained"
              style={{
                borderRadius: 100,
                height: 46,
                justifyContent: "center",
                minWidth: 130,
              }}
              onPress={goToNextSlide}
              labelStyle={{
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              Next
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
