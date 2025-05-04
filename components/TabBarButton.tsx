import { Feather, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const icon: { [key: string]: any } = {
  index: (props: any) => <Feather name="home" size={24} {...props} />,
  more: (props: any) => <AntDesign name="appstore-o" size={24} {...props} />,
  ideabooks: (props: any) => (
    <MaterialCommunityIcons name="heart-outline" size={24} {...props} />
  ),
};

const TabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  label,
  color,
}: any) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 350 });
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);

    const top = interpolate(scale.value, [0, 1], [0, 9]);
    return {
      top,
      transform: [{ scale: scaleValue }],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      opacity,
    };
  });

  return (
    <Pressable
      onPress={onPress}
      style={styles.tabBarItem}
      onLongPress={onLongPress}
    >
      <Animated.View style={animatedIconStyle}>
        {icon[routeName]({ color })}
      </Animated.View>
      <Animated.Text
        style={[
          {
            color,
            fontSize: 12,
            fontFamily: "Eina",
          },
          animatedTextStyle,
        ]}
      >
        {label as any}
      </Animated.Text>
    </Pressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    gap: 5,
    alignItems: "center",
  },
});
