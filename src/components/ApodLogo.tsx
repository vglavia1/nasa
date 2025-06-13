import React, { useEffect, useState } from "react";
import { Image, View, ActivityIndicator, StyleSheet, Dimensions } from "react-native";

const APOD_URL = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const ApodLogo = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(APOD_URL)
      .then((res) => res.json())
      .then((data) => {
        setImageUrl(data.url);
      })
      .catch(() => setImageUrl(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="small" color="#FFF" />
      </View>
    );
  }

  if (!imageUrl) return null;

  return (
    <Image
      source={{ uri: imageUrl }}
      style={styles.image}
      resizeMode="contain"
      accessibilityLabel="NASA Astronomy Picture of the Day"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.5,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: "#FFF",
    backgroundColor: "#222",
    alignSelf: "center",
  },
  loaderContainer: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default ApodLogo;
