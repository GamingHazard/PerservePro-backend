import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Transport = () => {
  return (
    <View style={styles.container}>
      <Text>Transport</Text>
    </View>
  );
};

export default Transport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
    alignItems: "center",
    justifyContent: "center",
  },
});
