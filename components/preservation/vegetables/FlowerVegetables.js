import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import { ScrollView } from "react-native";
import {
  FlowerVegetables,
  flowerVegPreservationMethods,
  FlowerTransportationMethods,
} from "../vegetables/Text.js";
import IntroImg from "./Introimg.js";

const FlowerVegs = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.icon_Container}></View>

        <Image
          source={require("../../../assets/vegs/flowerVegs.jpeg")}
          style={{ width: "100%", height: 300, resizeMode: "cover" }}
        />

        <View style={styles.content}>
          {/* Introduction */}
          <View style={{ marginBottom: 10 }}>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                height: 50,
                backgroundColor: "navy",
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "serif",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Introduction
              </Text>
            </View>
            <Text style={styles.text}>{FlowerVegetables.introduction}</Text>

            {FlowerVegetables.vegetables.map((vegetable, index) => (
              <View key={index} style={styles.vegetableContainer}>
                <Image source={vegetable.image} style={styles.image} />
                <View style={styles.textContainer}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {vegetable.name}
                  </Text>
                  <Text>{vegetable.description}</Text>
                </View>
              </View>
            ))}

            <Text>{FlowerVegetables.conclusion}</Text>
          </View>

          {/* Preservation Steps */}
          <View>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                height: 50,
                backgroundColor: "navy",
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "serif",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Preservation Mthds
              </Text>
            </View>

            <Text style={styles.text}>
              {Object.entries(flowerVegPreservationMethods).map(
                ([method, steps]) => (
                  <View key={method}>
                    <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                      {method}
                    </Text>

                    <Text>{steps}</Text>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "gray",
                        marginVertical: 10,
                      }}
                    />
                  </View>
                )
              )}
            </Text>
          </View>

          {/* Transportation*/}
          <View>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                height: 50,
                backgroundColor: "navy",
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "serif",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Transportation
              </Text>
            </View>

            {Object.entries(FlowerTransportationMethods).map(
              ([method, steps]) => (
                <View key={method}>
                  <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                    {method}
                  </Text>

                  <Text>{steps}</Text>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "gray",
                      marginVertical: 10,
                    }}
                  />
                </View>
              )
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FlowerVegs;

const styles = StyleSheet.create({
  container: {
    top: 30,
    flex: 1,
    backgroundColor: "skyblue",
  },
  imgStyle: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
    flex: 1,
  },
  icon_Container: {
    backgroundColor: "navy",
    padding: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  content: {
    backgroundColor: "whitesmoke",
    padding: 10,
    height: "100%",
  },
  text: {
    color: "black",
  },
  Button: {
    height: 40,
    width: 50,
  },
  vegetableContainer: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "white",
  },
  image: {
    width: 100,
    height: "100%",
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
});
