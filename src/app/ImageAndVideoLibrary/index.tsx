import { SearchBar, SearchResultImage } from "@components";
import LoadingBar from "../../components/LoadingBar";
import { colors } from "@constants";
import { useQuery } from "@tanstack/react-query";
import * as Linking from "expo-linking";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { Platform, StyleSheet, Text, View, FlatList, Modal, TouchableOpacity, Image, ScrollView } from "react-native";

import { QUERY_KEYS } from "../../api/constants";
import { getSearch } from "../../api/search.api";

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [focusedItem, setFocusedItem] = useState<any | null>(null);

  const { isLoading, data } = useQuery({
    queryKey: [QUERY_KEYS.images, searchInput],
    queryFn: () => getSearch(searchInput),
    enabled: !!searchInput,
  });

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontFamily: Platform.OS === "ios" ? "AvenirNext-DemiBold" : "sans-serif-medium",
                fontWeight: "bold",
                fontSize: 22,
                color: colors.marianBlue,
              }}
            >
              NASA Image and Video Library
            </Text>
          ),
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
          <>
            <FlatList
              contentContainerStyle={styles.flatlistContainer}
              data={data?.collection?.items ?? []}
              renderItem={({ item }) => {
                const uri = item.links?.[0]?.href;
                return (
                  <TouchableOpacity onPress={() => setFocusedItem(item)}>
                    <SearchResultImage links={item.links} />
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.data[0].nasa_id}
            />
            <Modal
              visible={!!focusedItem}
              transparent
              animationType="fade"
              onRequestClose={() => setFocusedItem(null)}
            >
              <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.95)', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} onPress={() => setFocusedItem(null)} />
                {focusedItem && (
                  <View style={{ maxHeight: '80%', maxWidth: '95%', width: 400, backgroundColor: 'transparent', borderRadius: 20, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <TouchableOpacity
                      onPress={() => setFocusedItem(null)}
                      style={{ position: 'absolute', top: 10, right: 10, zIndex: 2, backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 16, padding: 6 }}
                      accessibilityLabel="Close modal"
                    >
                      <Text style={{ color: '#FFF', fontSize: 24, fontWeight: 'bold' }}>×</Text>
                    </TouchableOpacity>
                    <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                      <Image
                        source={{ uri: focusedItem.links?.[0]?.href }}
                        style={{ width: '100%', height: 300, borderRadius: 16, borderWidth: 2, borderColor: '#FFF', marginBottom: 24, marginTop: 40 }}
                        resizeMode="contain"
                      />
                      <View style={{ backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 12, padding: 16, maxWidth: '100%', marginBottom: 40 }}>
                        <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 20, marginBottom: 8 }}>
                          {focusedItem.data?.[0]?.title}
                        </Text>
                        <Text style={{ color: '#FFF', fontSize: 16, marginBottom: 8 }}>
                          {focusedItem.data?.[0]?.description}
                        </Text>
                        {focusedItem.data?.[0]?.date_created && (
                          <Text style={{ color: '#AAA', fontSize: 14 }}>
                            {new Date(focusedItem.data[0].date_created).toLocaleString()}
                          </Text>
                        )}
                      </View>
                    </ScrollView>
                  </View>
                )}
              </View>
            </Modal>
          </>
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
