import { useUploadAssetMutation } from "@/api";
import { baseURL } from "@/api/api";
import { User, useUpdateUserMutation } from "@/api/authentication";
import { AppTheme } from "@/app/_layout";
import { isAndroid } from "@/utils";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import React, { useState } from "react";
import { Image, View } from "react-native";
import { useTheme } from "react-native-paper";
import Svg, { Path } from "react-native-svg";
import * as Yup from "yup";
import AuthButton from "./AuthButton";
import BaseButton from "./BaseButton";
import Box from "./Box";
import { useForm } from "./Form";
import ImagePicker from "./ImagePicker";
import TextInput from "./TextInput";

interface BasicInfoProps {
  user: User;
  onFinish?: (values: any) => void;
}

const SCHEMA = {
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  dob: Yup.string().required("Date of birth is required."),
  email: Yup.string()
    .email("Email is not valid.")
    .required("Email is required."),
};

const BasicInfo = ({ user, onFinish }: BasicInfoProps) => {
  const theme = useTheme<AppTheme>();
  const [showPicker, setShowPicker] = useState(!isAndroid);
  const [image, setImage] = useState<any>(
    user && user.image ? user.image : null
  );
  const [uploadAsset, { isLoading: isUploading }] = useUploadAssetMutation();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleUpdateUser = (values: any) => {
    updateUser(values).then((res: any) => {
      if (!res.error) {
        if (onFinish) onFinish(values);
      }
    });
  };

  const onUpdate = ({ email: _, ...values }: any) => {
    if (image && image.uri) {
      const formData: any = new FormData();
      formData.append("file", {
        uri: image.uri,
        type: isAndroid ? "image/jpg" : "image",
        name: image.uri.split("/").pop(),
      });
      uploadAsset(formData).then((uploadRes: any) => {
        if (!uploadRes.error) {
          if (uploadRes.data.length > 0) {
            handleUpdateUser({ ...values, image: uploadRes.data[0] });
          }
        }
      });
    } else {
      handleUpdateUser(values);
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
      dob: user.dob || moment(new Date()).format("YYYY-MM-DD"),
    },
    validationSchema: Yup.object().shape(SCHEMA),
    onSubmit(values) {
      onUpdate(values);
    },
  });
  return (
    <Box flex={1}>
      <Box flex={1} gap={2}>
        <Box justifyContent="center" alignItems="center" gap={1.5}>
          <Box
            alignSelf="center"
            borderRadius={1000}
            width={100}
            height={100}
            borderWidth={1}
            overflow="hidden"
            borderColor={theme.colors.borderGrey}
          >
            {image ? (
              <Image
                resizeMode="cover"
                width={100}
                height={100}
                source={{
                  uri: image.uri
                    ? image.uri
                    : baseURL.replace("/api", "") + image,
                }}
              />
            ) : (
              <Svg
                width={100}
                height={100}
                style={
                  {
                    enableBackground: "new 0 0 53 53",
                  } as any
                }
                viewBox="0 0 53 53"
              >
                <Path
                  fill="#ffffff"
                  d="m18.613 41.552-7.907 4.313a7.106 7.106 0 0 0-1.269.903A26.377 26.377 0 0 0 26.5 53c6.454 0 12.367-2.31 16.964-6.144a7.015 7.015 0 0 0-1.394-.934l-8.467-4.233a3.229 3.229 0 0 1-1.785-2.888v-3.322c.238-.271.51-.619.801-1.03a19.482 19.482 0 0 0 2.632-5.304c1.086-.335 1.886-1.338 1.886-2.53v-3.546c0-.78-.347-1.477-.886-1.965v-5.126s1.053-7.977-9.75-7.977-9.75 7.977-9.75 7.977v5.126a2.644 2.644 0 0 0-.886 1.965v3.546c0 .934.491 1.756 1.226 2.231.886 3.857 3.206 6.633 3.206 6.633v3.24a3.232 3.232 0 0 1-1.684 2.833z"
                />
                <Path
                  fill="#1364ff"
                  d="M26.953.004C12.32-.246.254 11.414.004 26.047-.138 34.344 3.56 41.801 9.448 46.76a7.041 7.041 0 0 1 1.257-.894l7.907-4.313a3.23 3.23 0 0 0 1.683-2.835v-3.24s-2.321-2.776-3.206-6.633a2.66 2.66 0 0 1-1.226-2.231v-3.546c0-.78.347-1.477.886-1.965v-5.126S15.696 8 26.499 8s9.75 7.977 9.75 7.977v5.126c.54.488.886 1.185.886 1.965v3.546c0 1.192-.8 2.195-1.886 2.53a19.482 19.482 0 0 1-2.632 5.304c-.291.411-.563.759-.801 1.03V38.8c0 1.223.691 2.342 1.785 2.888l8.467 4.233a7.05 7.05 0 0 1 1.39.932c5.71-4.762 9.399-11.882 9.536-19.9C53.246 12.32 41.587.254 26.953.004z"
                />
              </Svg>
            )}
          </Box>
          <ImagePicker onUpload={setImage}>
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
        <TextInput
          label="First Name"
          onChangeText={handleChange("firstName")}
          helperText={errors.firstName}
          error={Boolean(errors.firstName)}
          defaultValue={values.firstName}
          onFocus={handleFoucs("firstName")}
        />
        <TextInput
          label="Last Name"
          onChangeText={handleChange("lastName")}
          helperText={errors.lastName}
          error={Boolean(errors.lastName)}
          defaultValue={values.lastName}
          onFocus={handleFoucs("lastName")}
        />
        <TextInput
          label="Email"
          autoCapitalize="none"
          readOnly
          keyboardType="email-address"
          onChangeText={handleChange("email")}
          helperText={errors.email}
          error={Boolean(errors.email)}
          onFocus={handleFoucs("email")}
          defaultValue={values.email}
        />
        <Box position="relative">
          <BaseButton
            onPress={() => {
              if (isAndroid) setShowPicker(true);
            }}
          >
            <View style={{ pointerEvents: "none" }}>
              <TextInput
                label="Date of birth"
                helperText={errors.dob}
                error={Boolean(errors.dob)}
                onFocus={handleFoucs("dob")}
                value={isAndroid ? values.dob : undefined}
              />
            </View>
          </BaseButton>
          {showPicker && (
            <DateTimePicker
              style={{
                position: "absolute",
                top: 31,
                left: isAndroid ? -10 : -4,
              }}
              testID="datePicker"
              value={new Date(values.dob)}
              // maximumDate={new Date()}
              mode="date"
              onChange={(_, s) => {
                if (isAndroid) setShowPicker(false);
                setFieldValue("dob", moment(s).format("YYYY-MM-DD"));
              }}
            />
          )}
        </Box>
      </Box>
      <AuthButton loading={isLoading || isUploading} onPress={handleSubmit}>
        Submit
      </AuthButton>
    </Box>
  );
};

export default BasicInfo;
