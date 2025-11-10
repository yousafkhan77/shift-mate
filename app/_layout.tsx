import { store } from "@/redux/store";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import Toast, { BaseToast } from "react-native-toast-message";
import { Provider } from "react-redux";

const toastConfig = {
  tomatoToast: (props: any) => {
    return (
      <BaseToast
        {...props}
        text1NumberOfLines={10}
        style={{ marginTop: 20, borderLeftColor: "#007c52" }}
      />
    );
  },
  error: (props: any) => (
    <BaseToast
      {...props}
      text1NumberOfLines={10}
      style={{ marginTop: 20, borderLeftColor: "red" }}
    />
  ),
};

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
    brandGreen: "#00AA45",
    green: "#7cd65e",
    borderGrey: "#E0E0E0",
    iconGrey100: "#2d2e2f",
    spaceBlack: "#39434D",
    spaceGrey: "#727272",
  },
};

export type AppTheme = typeof theme;

export default function RootLayout() {
  const [loaded] = useFonts({
    SatoshiLight: require("../assets/fonts/Satoshi-Light.otf"),
    Satoshi: require("../assets/fonts/Satoshi-Regular.otf"),
    SatoshiMedium: require("../assets/fonts/Satoshi-Medium.otf"),
    SatoshiBold: require("../assets/fonts/Satoshi-Bold.otf"),
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
      <ActionSheetProvider>
        <KeyboardProvider>
          <PaperProvider theme={theme}>
            <Stack>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen
                name="onboarding"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="(pickup)" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="profile"
                options={{ headerShown: false, animation: "slide_from_bottom" }}
              />
              <Stack.Screen name="tutorial" options={{ headerShown: false }} />
              <Stack.Screen
                name="addresses"
                options={{ headerShown: false, animation: "slide_from_bottom" }}
              />
              <Stack.Screen
                name="editProfile"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="locationPicker"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="deliveryView"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="booking/[id]"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="camera"
                options={{
                  headerShown: false,
                  presentation: "containedModal",
                }}
              />
            </Stack>
            <Toast config={toastConfig} />
            <StatusBar style="dark" />
          </PaperProvider>
        </KeyboardProvider>
      </ActionSheetProvider>
    </Provider>
  );
}
