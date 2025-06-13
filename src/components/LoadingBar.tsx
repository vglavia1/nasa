import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { colors } from "@constants";

const LoadingBar = () => {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [translateX]);

  const dotPosition = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 280], // Adjust 280 to match your container width
  });

  return (
    <View style={styles.rocketContainer}>
      <Animated.View
        style={[styles.dot, { transform: [{ translateX: dotPosition }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rocketContainer: {
    height: 50,
    width: 320,
    backgroundColor: colors.jet,
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  dot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.marianBlue,
    borderWidth: 3,
    borderColor: colors.white,
    position: "absolute",
    left: 0,
    top: 9,
  },
});

export default LoadingBar;
