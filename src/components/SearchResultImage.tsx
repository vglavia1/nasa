import { memo, useMemo } from "react";
import { View, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const SearchResultImage = ({ links }) => {
  const uri = useMemo(() => {
    if (links) {
      return links[0].href;
    }
  }, [links]);

  if (!uri) {
    return <></>;
  }

  return (
    <LinearGradient
      colors={[
        "#FF0000",
        "#FF7F00",
        "#FFFF00",
        "#00FF00",
        "#0000FF",
        "#4B0082",
        "#9400D3",
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ borderRadius: 12, padding: 2, marginBottom: 8 }}
    >
      <View style={{ borderRadius: 10, overflow: "hidden" }}>
        <Image
          style={{ width: "100%", height: 140, borderRadius: 10 }}
          resizeMode="cover"
          source={{ uri }}
        />
      </View>
    </LinearGradient>
  );
};

export default memo(SearchResultImage);
