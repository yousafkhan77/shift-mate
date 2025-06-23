import { useAddFieldsMutation, useUploadAssetMutation } from "@/api";
import { baseURL } from "@/api/api";
import { User } from "@/api/authentication";
import { AppTheme } from "@/app/_layout";
import { capitalize, isAndroid } from "@/utils";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import React, { useState } from "react";
import { Dimensions, Image, ScrollView, View } from "react-native";
import MaskInput from "react-native-mask-input";
import { Text, useTheme } from "react-native-paper";
import * as Yup from "yup";
import AuthButton from "./AuthButton";
import BaseButton from "./BaseButton";
import Box from "./Box";
import DriverSVG from "./DriverSVG";
import { useForm } from "./Form";
import ImagePicker from "./ImagePicker";
import TextInput from "./TextInput";

interface DriverLicenceProps {
  user: User;
  onFinish?: (values: any) => void;
}

const SCHEMA = {
  licenceExpiration: Yup.string().required(
    "Driver licence expiration date is required."
  ),
  licenceNumber: Yup.string()
    .required("Driver licence number is required.")
    .matches(
      /^\d{5}-\d{7}$/,
      "Licence number must be in 12345-1234567 format."
    ),
};

const { width } = Dimensions.get("window");

const DriverLicence = ({ user, onFinish }: DriverLicenceProps) => {
  const theme = useTheme<AppTheme>();
  const [showPicker, setShowPicker] = useState(!isAndroid);
  const [uploadAsset, { isLoading: isUploading }] = useUploadAssetMutation();
  const [addFields, { isLoading: isAdding }] = useAddFieldsMutation();
  const [images, setImages] = useState<any>(
    user
      ? {
          front: user.licenceFront,
          back: user.licenceBack,
        }
      : {}
  );

  const onFinalSubmit = (values: any) => {
    const payload: any = {
      licenceExpiration: values.licenceExpiration,
      licenceNumber: values.licenceNumber,
    };

    if (values.front) {
      payload.licenceFront = values.front;
    }

    if (values.back) {
      payload.licenceBack = values.back;
    }

    addFields(payload).then((res: any) => {
      if (!res.error) {
        if (onFinish) onFinish({ ...values, ...payload });
      }
    });
  };

  const onSubmit = (values: any) => {
    const imageKeys = Object.keys(images);
    if (
      imageKeys.length > 0 &&
      imageKeys.some((imageKey) => images[imageKey].uri)
    ) {
      const formData: any = new FormData();
      const imagesUpdated: string[] = [];
      imageKeys.forEach((imageKey) => {
        if (images[imageKey].uri) {
          imagesUpdated.push(imageKey);
          formData.append("file", {
            uri: images[imageKey].uri,
            type: isAndroid ? "image/jpg" : "image",
            name: images[imageKey].uri.split("/").pop(),
          });
        }
      });
      uploadAsset(formData).then((uploadRes: any) => {
        if (!uploadRes.error) {
          if (uploadRes.data.length > 0) {
            (uploadRes.data as string[]).forEach((u, i) => {
              values[imagesUpdated[i]] = u;
            });
            onFinalSubmit(values);
          }
        }
      });
    } else {
      onFinalSubmit(values);
    }
  };

  const {
    errors,
    handleChange,
    values,
    handleFoucs,
    handleSubmit,
    setFieldValue,
  } = useForm({
    initialValues: {
      ...user,
      licenceExpiration:
        user.licenceExpiration || moment(new Date()).format("YYYY-MM-DD"),
    },
    validationSchema: Yup.object().shape(SCHEMA),
    onSubmit,
  });
  return (
    <Box flex={1}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box flex={1} gap={2} pb={2}>
          <Box position="relative">
            <MaskInput
              value={values.licenceNumber}
              onChangeText={(masked, _) => {
                handleChange("licenceNumber")(masked);
              }}
              style={{
                position: "absolute",
                top: 28,
                height: 40,
                left: isAndroid ? 10 : 12,
                zIndex: 1,
                width: "90%",
              }}
              onFocus={handleFoucs("licenceNumber")}
              maxLength={13}
              keyboardType="numeric"
              mask={[
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
              ]}
            />
            <TextInput
              label="Driver licence number"
              // onChangeText={handleChange("licenceNumber")}
              helperText={errors.licenceNumber}
              error={Boolean(errors.licenceNumber)}
              // defaultValue={values.licenceNumber}
              keyboardType="numeric"
              readOnly
              onFocus={handleFoucs("licenceNumber")}
            />
          </Box>
          <Box position="relative">
            <BaseButton
              onPress={() => {
                if (isAndroid) setShowPicker(true);
              }}
            >
              <View style={{ pointerEvents: "none" }}>
                <TextInput
                  label="Driver licence expiration date"
                  helperText={errors.licenceExpiration}
                  error={Boolean(errors.licenceExpiration)}
                  onFocus={handleFoucs("licenceExpiration")}
                  value={isAndroid ? values.licenceExpiration : undefined}
                />
              </View>
            </BaseButton>
            {showPicker && (
              <DateTimePicker
                style={{ position: "absolute", top: 31, left: -4 }}
                testID="licenceDatePicker"
                value={new Date(values.licenceExpiration)}
                // minimumDate={new Date()}
                mode="date"
                onChange={(_, s) => {
                  if (isAndroid) setShowPicker(false);
                  setFieldValue(
                    "licenceExpiration",
                    moment(s).format("YYYY-MM-DD")
                  );
                }}
              />
            )}
          </Box>
          {["front", "back"].map((dir) => (
            <Box mt={2} key={dir}>
              <Text variant="titleMedium" style={{ fontFamily: "SatoshiBold" }}>
                {capitalize(dir)} of driver's licence
              </Text>
              <Box justifyContent="center" alignItems="center" mt={-3}>
                {images[dir] ? (
                  <Box
                    my={5.5}
                    height={220}
                    borderRadius={8}
                    borderWidth={1}
                    borderColor={theme.colors.borderGrey}
                    overflow="hidden"
                  >
                    <Image
                      width={width - 40}
                      height={220}
                      resizeMode="cover"
                      source={{
                        uri: images[dir].uri
                          ? images[dir].uri
                          : baseURL.replace("/api", "") + images[dir],
                      }}
                    />
                  </Box>
                ) : (
                  <DriverSVG />
                )}
                <Box mt={-3}>
                  <ImagePicker
                    event={`camera.use_photo_driver_licence_${dir}`}
                    onUpload={(asset) => {
                      setImages({ ...images, [dir]: asset });
                    }}
                    trigger={images}
                  >
                    {({ openPicker }) => (
                      <AuthButton
                        mode="outlined"
                        style={{ height: 40 }}
                        onPress={openPicker}
                        textColor={theme.colors.spaceBlack}
                      >
                        Add a photo*
                      </AuthButton>
                    )}
                  </ImagePicker>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </ScrollView>
      <Box pt={2}>
        <AuthButton loading={isAdding || isUploading} onPress={handleSubmit}>
          Submit
        </AuthButton>
      </Box>
    </Box>
  );
};

export default DriverLicence;
