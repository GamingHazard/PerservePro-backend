import { StyleSheet, Image, Text, View } from "react-native";
import React from "react";

const IntroImg = ({ vegImg, bio }) => {
  return (
    <View style={styles.vegImg}>
      <Image
        style={{ width: "30%", height: "100%", marginRight: 10 }}
        source={vegImg}
      />
      <Text style={{ width: 200, fontWeight: "bold" }}>{bio}</Text>
    </View>
  );
};

export default IntroImg;

const styles = StyleSheet.create({
  vegImg: {
    width: "100%",
    height: "auto",
    backgroundColor: "white",
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
    border: 1,
    borderColor: "black",
  },
});
