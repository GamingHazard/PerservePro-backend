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
  ugandanFruits,
  fruitPreservation,
  transportMeans,
} from "./vegetables/Text.js";

const Fruits = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.icon_Container}></View>

        <Image
          source={require("../../assets/vegs/fruits.jpeg")}
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

            <Text style={styles.text}>{ugandanFruits.introduction}</Text>

            {ugandanFruits.fruits.map((vegetable, index) => (
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

            <Text>{ugandanFruits.conclusion}</Text>
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

            {Object.entries(fruitPreservation).map(([method, steps]) => (
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

            {Object.entries(transportMeans).map(([means, { pros, cons }]) => (
              <View key={means} style={styles.transportContainer}>
                <Text style={styles.title}>{means}</Text>

                <View style={styles.prosConsContainer}>
                  <View style={styles.prosContainer}>
                    <Text style={styles.label}>Pros:</Text>
                    {pros.map((pro, index) => (
                      <Text
                        key={`pro-${index}`}
                        style={styles.text}
                      >{`\u2022 ${pro}`}</Text>
                    ))}
                  </View>

                  <View style={styles.consContainer}>
                    <Text style={styles.label}>Cons:</Text>
                    {cons.map((con, index) => (
                      <Text
                        key={`con-${index}`}
                        style={styles.text}
                      >{`\u2022 ${con}`}</Text>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={{ width: "100%", height: 70 }}></View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Fruits;

const styles = StyleSheet.create({
  container: {
    top: -10,
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
    height: 115,
  },
  image: {
    width: 100,
    height: "100%",
    marginRight: 10,
  },
  transportContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  prosConsContainer: {
    flexDirection: "row",
  },
  prosContainer: {
    flex: 1,
    marginRight: 8,
  },
  consContainer: {
    flex: 1,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  text: {
    marginBottom: 4,
  },
});
