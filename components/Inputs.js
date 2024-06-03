import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const Inputs = ({
  placeholder,
  inputStyle,
  keyboard,
  value,
  onChangeText,
  multiline,
  numberOfLines,
}) => {
  return (
    <View style={[styles.input, inputStyle]}>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboard}
        placeholder={placeholder}
        multiline={multiline}
        numberOfLines={numberOfLines}
      />
    </View>
  );
};

export default Inputs;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 40,
    padding: 10,
    justifyContent: "center",
    backgroundColor: "white",
    elevation: 8,
    borderRadius: 8,
    marginVertical: 10,
  },
});
