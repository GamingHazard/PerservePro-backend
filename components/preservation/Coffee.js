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
  CoffeeIntro,
  CoffeePreservation,
  CoffeeTransportationSteps,
} from "./vegetables/Text.js";

const Coffee = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={require("../../assets/vegs/coffee.jpeg")}
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

            <Text style={styles.text}>{CoffeeIntro.introduction}</Text>

            {CoffeeIntro.coffees.map((vegetable, index) => (
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

            <Text>{CoffeeIntro.conclusion}</Text>
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

            {Object.entries(CoffeePreservation).map(([method, steps]) => (
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
            ))}
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

            <Text style={styles.introduction}>
              {CoffeeTransportationSteps.introduction}
            </Text>

            {CoffeeTransportationSteps.methods.map((method, index) => (
              <View key={index} style={styles.methodContainer}>
                <Text style={styles.methodName}>{`${index + 1}. ${
                  method.name
                }`}</Text>
                <Text style={styles.methodDescription}>
                  {formatDescription(method.description)}
                </Text>
              </View>
            ))}

            <Text style={styles.conclusion}>
              {CoffeeTransportationSteps.conclusion}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Coffee;
const formatDescription = (description) => {
  const subpoints = description
    .split("\n")
    .filter((point) => point.trim() !== "");

  return (
    <View style={styles.subpointsContainer}>
      {subpoints.map((point, index) => (
        <Text
          key={index}
          style={styles.subpoint}
        >{`\u2022 ${point.trim()}`}</Text>
      ))}
    </View>
  );
};

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
    height: 110,
  },
  image: {
    width: 100,
    height: "100%",
    marginRight: 10,
  },
  introduction: {
    marginBottom: 16,
  },
  methodContainer: {
    marginBottom: 16,
  },
  methodName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  methodDescription: {
    marginBottom: 8,
  },
  subpointsContainer: {
    marginLeft: 16,
  },
  subpoint: {
    marginBottom: 4,
  },
  conclusion: {
    marginTop: 16,
  },
});
