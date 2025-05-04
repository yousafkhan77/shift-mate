import React from "react";
import { Redirect, Stack } from "expo-router";
import useAsyncStorage from "@/hooks/useAsyncStorage";

export default function Layout() {
  const [onboardingCompleted, _, isLoading] = useAsyncStorage(
    "onboarding-completed"
  );

  if (isLoading) {
    return null;
  }

  if (onboardingCompleted) {
    return <Redirect href="/register" />;
  }

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    />
  );
}
