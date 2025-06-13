import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View, Text } from "react-native";
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
      <Animated.View style={[styles.emoji, { transform: [{ translateX: dotPosition }] }]}> 
        <Text style={{ fontSize: 32 }}>🚀</Text>
      </Animated.View>
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
  emoji: {
    position: "absolute",
    left: 0,
    top: 9,
  },
});

export default LoadingBar;
