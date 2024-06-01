import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Tips = () => {
  return (
    <View style={styles.container}>
      <Text>Tips</Text>
    </View>
  );
};

export default Tips;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgreen",
    justifyContent: "center",
    alignItems: "center",
    top: 30,
  },
});
