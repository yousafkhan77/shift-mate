import { useGetVerificationStatusMutation } from "@/api";
import AuthButton from "@/components/AuthButton";
import BaseButton from "@/components/BaseButton";
import Box from "@/components/Box";
import ProfileDetailItem from "@/components/ProfileDetailItem";
import { updateStore } from "@/redux/slices/common";
import { useTypedDispatch } from "@/redux/store";
import { isAndroid } from "@/utils";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { DeviceEventEmitter, SafeAreaView } from "react-native";
import { Text, useTheme } from "react-native-paper";
import Toast from "react-native-toast-message";
import { AppTheme } from "../_layout";

const DriverVerificationMethods = [
  { label: "Basic Info", value: "basicInfo" },
  { label: "Driver Licence", value: "driverLicence" },
  { label: "ID Card", value: "idCard" },
  { label: "Selfie with ID", value: "selfieWithID" },
  { label: "Vehicle Info", value: "vehicleInfo" },
];

const CompanyVerificationMethods = [
  { label: "Company Info", value: "companyInfo" },
  { label: "Company Registration", value: "companyRegistration" },
  { label: "Company Rates", value: "companyRates" },
  { label: "ID Card", value: "idCard" },
  { label: "Selfie with ID", value: "selfieWithID" },
];

const DriverVerificationFields = {
  basicInfo: ["firstName", "lastName", "email", "dob", "image"],
  driverLicence: [
    "licenceExpiration",
    "licenceNumber",
    "licenceFront",
    "licenceBack",
  ],
  idCard: ["idCardNumber", "idCardFront", "idCardBack"],
  selfieWithID: ["selfieWithID"],
  vehicleInfo: [
    "registrationNumber",
    "vehicleBrand",
    "vehicleModel",
    "vehicleColor",
    "vehicleYear",
    "vehicleType",
    "vehicleImage",
  ],
};

const CompanyVerificationFields = {
  companyInfo: [
    "companyName",
    "companyEmail",
    "companyPhone",
    "companyAddress",
    "companyImage",
  ],
  idCard: ["idCardNumber", "idCardFront", "idCardBack"],
  selfieWithID: ["selfieWithID"],
  companyRegistration: [
    "companyNTN",
    "registrationNumber",
    "registrationDate",
    "registrationCertificate",
  ],
  companyRates: ["ratePerKM", "ratePerKG"],
};

const VerificationMethodListItem = ({
  label,
  onPress,
  isSelected,
}: {
  isSelected?: boolean;
  label: string;
  onPress: () => void;
}) => {
  const theme = useTheme<AppTheme>();
  return (
    <BaseButton onPress={onPress}>
      <ProfileDetailItem
        label={label}
        onPress={onPress}
        value=""
        hideEmptyValue
        containerProps={{
          borderWidth: 1,
          borderColor: theme.colors.borderGrey,
        }}
        icon={
          <Box direction="row" alignItems="center" gap={1}>
            {isSelected && (
              <FontAwesome6
                name="check-circle"
                size={18}
                color={theme.colors.spaceBlack}
              />
            )}
            <Feather
              name="chevron-right"
              size={24}
              color={theme.colors.spaceBlack}
            />
          </Box>
        }
        labelProps={{
          variant: "titleMedium",
          style: { fontFamily: "SatoshiBold" },
        }}
      />
    </BaseButton>
  );
};

const Verification = () => {
  const dispatch = useTypedDispatch();
  const localSearchParams = useLocalSearchParams();
  const [searchParams, setSearchParams] = useState(localSearchParams);
  const [getVerificationStatus, { isLoading: isVerifying }] =
    useGetVerificationStatusMutation();
  const verified = useMemo(() => {
    const verificationFields: any =
      localSearchParams.type === "company"
        ? CompanyVerificationFields
        : DriverVerificationFields;
    return (
      searchParams &&
      Object.keys(verificationFields).reduce((acc: any, curr) => {
        acc[curr] = verificationFields[curr].every(
          (v: string) => searchParams[v]
        );
        return acc;
      }, {})
    );
  }, [searchParams]);

  useEffect(() => {
    DeviceEventEmitter.addListener("verification.params.update", (params) => {
      setSearchParams({ ...searchParams, ...params });
    });
    return () => {
      DeviceEventEmitter.removeAllListeners("verification.params.update");
    };
  }, [searchParams]);

  const onVerify = () =>
    getVerificationStatus(undefined).then((res: any) => {
      if (!res.error) {
        const { verificationStatus, message } = res.data;
        if (
          verificationStatus === "pending" ||
          verificationStatus === "rejected"
        ) {
          Toast.show({
            type: "error",
            text1: message,
          });
        } else {
          Toast.show({
            type: "success",
            text1: message,
          });
          dispatch(updateStore({ key: "user", value: searchParams }));
          router.replace("/(tabs)");
        }
      }
    });

  const onOpenDetail = (vm: any) =>
    router.push({
      pathname: "/verifyDetail",
      params: {
        title: vm.label,
        ...searchParams,
        type: vm.value,
      },
    });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Box
        flex={1}
        px={3}
        pt={isAndroid ? 28 / 4 : 4}
        pb={isAndroid ? 28 / 3.5 : 2.5}
        justifyContent="space-between"
      >
        <Box gap={2.5}>
          <Box gap={0.675}>
            <Text
              variant="displaySmall"
              style={{
                fontFamily: "SatoshiBold",
              }}
            >
              Let's get you verified
            </Text>
            <Text
              variant="bodyLarge"
              style={{
                fontFamily: "Satoshi",
              }}
            >
              Fill in your details to complete your verification.
            </Text>
          </Box>
          {(localSearchParams.type === "company"
            ? CompanyVerificationMethods
            : DriverVerificationMethods
          ).map((vm) => (
            <VerificationMethodListItem
              key={vm.value}
              {...vm}
              onPress={() => onOpenDetail(vm)}
              isSelected={verified[vm.value as "basicInfo"]}
            />
          ))}
        </Box>
        <AuthButton
          loading={isVerifying}
          disabled={Object.keys(verified).some(
            (v) => verified[v as "basicInfo"] === false
          )}
          onPress={onVerify}
        >
          Verify Details
        </AuthButton>
      </Box>
    </SafeAreaView>
  );
};

export default Verification;
