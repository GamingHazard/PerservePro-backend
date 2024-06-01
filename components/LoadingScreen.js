// LoadingScreen.js
import React from "react";
import { StyleSheet, View } from "react-native";
import AnimatedLoader from "react-native-animated-loader";

const LoadingScreen = ({ visible }) => {
  return (
    <View style={styles.container}>
      <AnimatedLoader
        visible={visible}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("../assets/animation/Animation1.json")} // Specify your animation JSON file
        animationStyle={styles.lottie}
        speed={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

export default LoadingScreen;
