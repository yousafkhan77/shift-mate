import { Ionicons } from "@expo/vector-icons";
import { CameraType, CameraView } from "expo-camera";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  BackHandler,
  DeviceEventEmitter,
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Text } from "react-native-paper";

const { width } = Dimensions.get("window");

const Camera = () => {
  const cameraRef = useRef<CameraView | null>(null);
  const { event = "camera.use_photo" } = useLocalSearchParams();
  const [image, setImage] = useState<any>("");
  const [flex, setFlex] = useState(0.5);
  const [facing, setFacing] = useState<CameraType>("back");

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      cameraRef.current
        .takePictureAsync({
          quality: 0.7,
        })
        .then((result) => {
          if (result) setImage(result?.uri);
        });
    }
  };

  const handleUsePhoto = () => {
    DeviceEventEmitter.emit(event as string, { uri: image });
    router.dismiss();
  };

  useEffect(() => {
    setTimeout(() => {
      setFlex(1);
    }, 0);
    // Handle the back button press
    const handleBackPress = () => {
      if (image) {
        // If an image is displayed, clear it to go back to the camera view
        setImage("");
        return true; // Prevent default back button behavior
      }
      return false; // Allow default back button behavior if no image is displayed
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => {
      setFlex(0.5);
      backHandler.remove(); // Cleanup the back handler
    };
  }, [image]);

  return (
    <View
      style={[
        {
          flex: 1,
        },
        image ? {} : { alignItems: "center", justifyContent: "center" },
      ]}
    >
      {image ? (
        <ImageBackground source={{ uri: image }} style={{ flex: 1 }}>
          <View
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                position: "absolute",
                bottom: "6%",
                justifyContent: "space-between",
                paddingHorizontal: 20,
              },
            ]}
          >
            <Pressable onPress={() => setImage("")}>
              <Text
                variant="titleMedium"
                style={{ fontFamily: "Eina", color: "white" }}
              >
                Take another
              </Text>
            </Pressable>
            <Pressable onPress={handleUsePhoto}>
              <Text
                variant="titleMedium"
                style={{ fontFamily: "Eina", color: "white" }}
              >
                Use Photo
              </Text>
            </Pressable>
          </View>
        </ImageBackground>
      ) : (
        <>
          <CameraView
            mode="picture"
            ref={cameraRef}
            style={{
              flex,
              width: "100%",
            }}
            facing={facing}
          />
          <View
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                position: "absolute",
                top: "6%",
                justifyContent: "space-between",
                paddingHorizontal: 20,
              },
            ]}
          >
            <Pressable onPress={() => router.dismiss()}>
              <Text
                variant="titleMedium"
                style={{ fontFamily: "Eina", color: "white" }}
              >
                Cancel
              </Text>
            </Pressable>
            <TouchableOpacity onPress={toggleCameraFacing}>
              <Ionicons name="camera-reverse-outline" size={33} color="white" />
            </TouchableOpacity>
          </View>
          <View
            style={{ position: "absolute", bottom: "6%", left: width / 2.5 }}
          >
            <TouchableOpacity
              style={[styles.captureButton]}
              onPress={() => {
                takePicture();
              }}
            >
              <Avatar.Image
                size={64}
                source={{}}
                style={{ backgroundColor: "white" }}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "white",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
