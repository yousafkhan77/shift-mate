import BasicInfo from "@/components/BasicInfo";
import Box from "@/components/Box";
import CompanyInfo from "@/components/CompanyInfo";
import CompanyRates from "@/components/CompanyRates";
import CompanyRegistration from "@/components/CompanyRegistration";
import DriverLicence from "@/components/DriverLicence";
import IconButton from "@/components/IconButton";
import IDCard from "@/components/IDCard";
import SelfieWithID from "@/components/SelfieWithID";
import VehicleInfo from "@/components/VehicleInfo";
import { isAndroid } from "@/utils";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { DeviceEventEmitter, Platform, SafeAreaView } from "react-native";
import { Text } from "react-native-paper";

const VerifyDetail = () => {
  const { title, type, ...user } = useLocalSearchParams();

  const onFinish = (values: any) => {
    DeviceEventEmitter.emit("verification.params.update", values);
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Box
        flex={1}
        px={2.5}
        pt={Platform.select({ ios: 2, android: 5.5 })}
        pb={isAndroid ? 28 / 3.5 : 2.5}
        gap={3}
      >
        <Box direction="row" alignItems="center">
          <IconButton onPress={() => router.back()}>
            <Feather name="arrow-left" size={22} color="black" />
          </IconButton>
          <Box flex={1} justifyContent="center" alignItems="center">
            <Text
              style={{
                fontSize: 18,
                fontFamily: "SatoshiBold",
              }}
            >
              {title}
            </Text>
          </Box>
          <IconButton style={{ visibility: "hidden", opacity: 0 }}>
            <Feather name="arrow-left" size={22} color="black" />
          </IconButton>
        </Box>
        <Box gap={2} flex={1}>
          {type === "basicInfo" ? (
            <BasicInfo user={user as any} onFinish={onFinish} />
          ) : type == "companyInfo" ? (
            <CompanyInfo user={user as any} onFinish={onFinish} />
          ) : type === "companyRegistration" ? (
            <CompanyRegistration user={user as any} onFinish={onFinish} />
          ) : type === "companyRates" ? (
            <CompanyRates user={user as any} onFinish={onFinish} />
          ) : type === "driverLicence" ? (
            <DriverLicence user={user as any} onFinish={onFinish} />
          ) : type === "idCard" ? (
            <IDCard user={user as any} onFinish={onFinish} />
          ) : type === "selfieWithID" ? (
            <SelfieWithID user={user as any} onFinish={onFinish} />
          ) : type === "vehicleInfo" ? (
            <VehicleInfo user={user as any} onFinish={onFinish} />
          ) : null}
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default VerifyDetail;
