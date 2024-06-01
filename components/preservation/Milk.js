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
  milkPreservation,
  milkTransportation,
  MilkIntro,
} from "./vegetables/Text.js";
const Milk = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.icon_Container}></View>

          <ImageBackground
            source={require("../../assets/vegs/milk.jpeg")}
            style={{ width: "100%", height: 300, resizeMode: "cover" }}
          ></ImageBackground>

          {/* Introduction */}
          <View style={{ marginBottom: 10, padding: 10, top: -7 }}>
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

            {/* Introduction */}
            <Text style={styles.text}>{MilkIntro}</Text>
          </View>

          {/* Preservation Steps */}
          <View style={{ padding: 10 }}>
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

            {Object.entries(milkPreservation).map(([method, steps]) => (
              <View key={method} style={{ marginBottom: 15 }}>
                <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                  {method}
                </Text>

                <Text style={{ marginBottom: 10 }}>{steps}</Text>

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

          <View style={{ padding: 10 }}>
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
                Transportation Mthds
              </Text>
            </View>

            <Text>{milkTransportation.introduction}</Text>
            {Object.keys(milkTransportation).map((key) => {
              const transportationMethod = milkTransportation[key];

              if (
                typeof transportationMethod === "object" &&
                transportationMethod !== null
              ) {
                return (
                  <View key={key}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {key}
                    </Text>
                    <Text>{transportationMethod.process}</Text>

                    {transportationMethod.pros && (
                      <View>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                          Pros:
                        </Text>
                        <Text>{transportationMethod.pros}</Text>
                      </View>
                    )}

                    {transportationMethod.cons && (
                      <View>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                          Cons:
                        </Text>
                        <Text>{transportationMethod.cons}</Text>
                      </View>
                    )}
                  </View>
                );
              }

              return null;
            })}

            <Text>{milkTransportation.conclusion}</Text>
          </View>

          <View style={{ width: "100%", height: 70 }}></View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Milk;

const styles = StyleSheet.create({
  container: {
    top: -10,
    flex: 1,
    backgroundColor: "whitesmoke",
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
    height: 60,

    margin: 10,
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
  content: {
    backgroundColor: "whitesmoke",

    height: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18, // You can adjust the font size as needed
    marginBottom: 8,
  },
  subtitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
});
