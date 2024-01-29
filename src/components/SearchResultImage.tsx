import React, { memo, useMemo } from "react";
import { Image } from "react-native";

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
    <>
      <Image
        style={{ width: "100%", height: 100 }}
        resizeMode="contain"
        source={{ uri }}
      />
    </>
  );
};

export default memo(SearchResultImage);
