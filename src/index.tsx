import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { QUERY_KEYS } from "./api/constants";
import { getSearch } from "./api/search.api";
import SearchResultImage from "./components/SearchResultImage";

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { isLoading, data } = useQuery({
    queryKey: [QUERY_KEYS.images, searchInput],
    queryFn: () => getSearch(searchInput),
  });

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={setUserInput}
            value={userInput}
            testID="TextInput"
          />
          <TouchableOpacity
            onPress={() => {
              setSearchInput(userInput);
            }}
            testID="Button:Submit"
          >
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <>
            <Text testID="Text:Loading">Loading...</Text>
          </>
        ) : (
          <FlatList
            contentContainerStyle={styles.flatlistContainer}
            data={data?.collection?.items ?? []}
            renderItem={({ item }) => <SearchResultImage links={item.links} />}
            keyExtractor={(item) => item.data[0].nasa_id}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  flatlistContainer: {
    marginHorizontal: 15,
    gap: 15,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginHorizontal: 15,
    marginBottom: 15,
  },
});
