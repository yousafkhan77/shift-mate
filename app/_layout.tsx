import { store } from "@/redux/store";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import { Provider } from "react-redux";

SplashScreen.preventAutoHideAsync();

const theme = {
  ...MD3LightTheme,
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#1364FF",
    secondary: "#f1c40f",
    tertiary: "#a1b2c3",
    white: "#FFFFFF",
    inputBorder: "#BCB9B4",
    black: "#151D31",
    iconGrey: "#8A8A8A",
    skyBlue: "#C4E8FA",
    lightBlue: "#E5F2FE",
    lightBlue100: "#F5F8FE",
    error: "#D41100",
    lightGrey: "#F7F7F7",
    grey600: "#BDBDBD",
    darkBlue: "#10074E",
    green: "#7cd65e",
    borderGrey: "#E0E0E0",
  },
};

export default function RootLayout() {
  const [loaded] = useFonts({
    SatoshiLight: require("../assets/fonts/Satoshi-Light.otf"),
    Satoshi: require("../assets/fonts/Satoshi-Regular.otf"),
    SatoshiBold: require("../assets/fonts/Satoshi-Bold.otf"),
    SatoshiMedium: require("../assets/fonts/Satoshi-Medium.otf"),
    SatoshiBlack: require("../assets/fonts/Satoshi-Black.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Stack>
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(pickup)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="profile"
            options={{ headerShown: false, animation: "slide_from_bottom" }}
          />
          <Stack.Screen name="editProfile" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </PaperProvider>
    </Provider>
  );
}
