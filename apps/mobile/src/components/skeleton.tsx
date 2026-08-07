import { useEffect } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

type SkeletonProps = {
  width: number;
  height: number;
  borderRadius?: number;
  style?: ViewStyle;
};

export default function Skeleton({
  width,
  height,
  borderRadius = 8,
  style,
}: SkeletonProps) {
  const translateX = useSharedValue(-width * 2);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width * 2, {
        duration: 1200,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, [width]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
          overflow: "hidden",
          backgroundColor: "#E5E5E5",
        },
        style,
      ]}
    >
      <AnimatedGradient
        colors={["transparent", "#F5F5F5", "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          StyleSheet.absoluteFill,
          {
            width: width / 2,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
}
