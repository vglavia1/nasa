import { SearchBar, SearchResultImage } from "@components";
import LoadingBar from "../../components/LoadingBar";
import { colors } from "@constants";
import { useQuery } from "@tanstack/react-query";
import * as Linking from "expo-linking";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import { QUERY_KEYS } from "../../api/constants";
import { getSearch } from "../../api/search.api";

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { isLoading, data } = useQuery({
    queryKey: [QUERY_KEYS.images, searchInput],
    queryFn: () => getSearch(searchInput),
    enabled: !!searchInput,
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: "NASA Image and Video Library",
          headerTintColor: colors.marianBlue,
        }}
      />
      <View style={styles.container}>
        <SearchBar
          input={userInput}
          setInput={setUserInput}
          onSubmit={() => {
            setSearchInput(userInput);
          }}
        />
        {!data && !isLoading && (
          <View
            style={{
              backgroundColor: colors.jet,
              borderRadius: 12,
              padding: 12,
            }}
          >
            <Text
              style={{
                color: colors.white,
                fontSize: 18,
                textAlign: "center",
                gap: 5,
              }}
            >
              Use this API to access the NASA Image and Video Library site at{" "}
              <Text
                style={{
                  textDecorationLine: "underline",
                }}
                onPress={() => {
                  Linking.openURL("https://images.nasa.gov/");
                }}
              >
                images.nasa.gov
              </Text>
              .{"\n\n"} For the latest documentation, please go{" "}
              <Text
                style={{
                  textDecorationLine: "underline",
                }}
                onPress={() => {
                  Linking.openURL(
                    "https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf",
                  );
                }}
              >
                here
              </Text>
              .
            </Text>
          </View>
        )}
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <LoadingBar />
          </View>
        ) : (
          <FlatList
            contentContainerStyle={styles.flatlistContainer}
            data={data?.collection?.items ?? []}
            renderItem={({ item }) => <SearchResultImage links={item.links} />}
            keyExtractor={(item) => item.data[0].nasa_id}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    gap: 15,
    flex: 1,
    padding: 12,
  },
  flatlistContainer: {
    marginHorizontal: 15,
    gap: 15,
  },
});
