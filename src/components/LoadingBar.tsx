import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { colors } from "@constants";

const LoadingBar = () => {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(widthAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false,
        }),
        Animated.timing(widthAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [widthAnim]);

  const barWidth = widthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.barContainer}>
      <Animated.View style={[styles.bar, { width: barWidth }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    height: 16,
    width: "100%",
    backgroundColor: colors.jet,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
  },
  bar: {
    height: "100%",
    backgroundColor: colors.marianBlue,
    borderRadius: 8,
  },
});

export default LoadingBar;
