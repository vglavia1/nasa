import { Button } from "@components";
import { colors } from "@constants";
import { Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { NASA } from "../../assets/svgs";
import ApodLogo from "../components/ApodLogo";

const App = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <Stack.Screen
        options={{
          contentStyle: { backgroundColor: colors.black },
          header: () => (
            <View
              style={{ paddingTop: insets.top, backgroundColor: colors.black }}
            />
          ),
          statusBarColor: "light",
        }}
      />
      <View style={{ flex: 1, margin: 24, gap: 24 }}>
        <View style={{ alignItems: "center", marginBottom: 12 }}>
          <ApodLogo />
        </View>
        {/* <NASA style={{ alignSelf: "center" }} height={250} width="75%" /> */}
        <Text
          style={{
            color: colors.white,
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Welcome to the NASA API portal
        </Text>
        <Button
          text="NASA Image and Video Library"
          href="/ImageAndVideoLibrary"
        />
      </View>
    </>
  );
};

export default App;
