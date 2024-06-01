import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const AddBtn = ({ addAction }) => {
  return (
    <View>
      <TouchableOpacity onPress={addAction} style={{}}>
        <MaterialCommunityIcons
          style={{ alignSelf: "center" }}
          name="plus-circle"
          size={60}
          color="#65000B"
        />
      </TouchableOpacity>
    </View>
  );
};

export default AddBtn;

const styles = StyleSheet.create({});
