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
  LeafyVegetables,
  LeafyVegetablePreservation,
  LeafyVegetableTransportation,
} from "../vegetables/Text.js";

const LeafyVegs = () => {
  const preservationMethods = LeafyVegetablePreservation.preservationMethods;
  const transportMethods = LeafyVegetableTransportation.transportMethods;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.icon_Container}></View>

        <Image
          source={require("../../../assets/vegs/leafyVegs.jpeg")}
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
            <Text style={styles.text}>{LeafyVegetables.introduction}</Text>

            {LeafyVegetables.vegetables.map((vegetable, index) => (
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

            <Text>{LeafyVegetables.conclusion}</Text>
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

            {preservationMethods.map((method, methodIndex) => (
              <View key={methodIndex} style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {` ${methodIndex + 1}: ${method.name}`}
                </Text>

                <View style={{ marginLeft: 16 }}>
                  {method.steps.map((step, stepIndex) => (
                    <Text key={stepIndex}>{`${stepIndex + 1}. ${step}`}</Text>
                  ))}
                </View>

                <TouchableOpacity
                  onPress={() => handleVideoClick(method.videoURL)}
                >
                  <Text
                    style={{ color: "blue", textDecorationLine: "underline" }}
                  >
                    Watch Video
                  </Text>
                </TouchableOpacity>
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

            {transportMethods.map((method, methodIndex) => (
              <View key={methodIndex} style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {method.name}
                </Text>
                <View style={{ marginLeft: 16 }}>
                  <Text style={{ fontWeight: "bold" }}>Pros:</Text>

                  {method.pros.map((pro, proIndex) => (
                    <Text key={proIndex}>{`- ${pro}`}</Text>
                  ))}

                  <Text style={{ fontWeight: "bold" }}>Cons:</Text>

                  {method.cons.map((con, conIndex) => (
                    <Text key={conIndex}>{`- ${con}`}</Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LeafyVegs;

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
