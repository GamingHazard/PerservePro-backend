import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Btn = ({ txtStyle, btnStyle, btnText, action }) => {
  return (
    <TouchableOpacity onPress={action}>
      <View style={[styles.btn, btnStyle]}>
        <Text style={[styles.btntxt, txtStyle]}>{btnText}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Btn;

const styles = StyleSheet.create({
  btn: {
    width: "30%",
    height: 30,
    backgroundColor: "#65000B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 10,
    alignSelf: "center",
  },
  btntxt: { color: "white", fontSize: 18 },
});
