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
import Icon from "react-native-vector-icons/FontAwesome";

import { ScrollView } from "react-native";
import {
  CerealVegetables,
  cerealPreservation,
  cerealTransportation,
} from "./vegetables/Text.js";
const Cereals = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.icon_Container}>
            <TouchableOpacity>
              <Icon
                style={{ left: -150 }}
                name="arrow-left"
                size={25}
                color="white"
              />
            </TouchableOpacity>

            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
              Cereals
            </Text>
          </View>

          <ImageBackground
            source={require("../../assets/vegs/cereals.jpeg")}
            style={{ width: "100%", height: 300, resizeMode: "cover" }}
          />

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
            <Text style={styles.text}>{CerealVegetables.introduction}</Text>

            {CerealVegetables.cereals.map((vegetable, index) => (
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

            <Text>{CerealVegetables.conclusion}</Text>
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

            {Object.entries(cerealPreservation).map(([method, steps]) => (
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

            {Object.keys(cerealTransportation).map((key, index) => {
              if (key !== "introduction" && key !== "conclusion") {
                const category = cerealTransportation[key];

                return (
                  <View key={key} style={{ marginBottom: 15 }}>
                    <Text style={styles.title}>{key}</Text>

                    <View>
                      <Text style={styles.subtitle}>Pros:</Text>
                      {category?.pros?.split(",").map((pro, index) => (
                        <Text key={index}>{pro.trim()}</Text>
                      ))}
                    </View>

                    <View style={styles.separator}></View>

                    <View>
                      <Text style={styles.subtitle}>Cons:</Text>
                      {category?.cons?.split(",").map((con, index) => (
                        <Text key={index}>{con.trim()}</Text>
                      ))}
                    </View>

                    {index !== Object.keys(cerealTransportation).length - 1 && (
                      <View style={styles.separator}></View>
                    )}
                  </View>
                );
              }
              return null;
            })}
          </View>

          <View style={{ width: "100%", height: 70 }}></View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Cereals;

const styles = StyleSheet.create({
  container: {
    top: 30,
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
