import { colors } from "@constants";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const SearchBar = ({ input, setInput, onSubmit }) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.textInput}
      value={input}
      onChangeText={setInput}
      testID="TextInput"
      autoFocus
      onSubmitEditing={onSubmit}
    />
    <Pressable onPress={onSubmit} testID="Button:Submit">
      <Text style={{ color: colors.black, fontSize: 18 }}>Submit</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    color: colors.black,
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: colors.white,
  },
});

export default SearchBar;
