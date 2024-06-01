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
  EggIntro,
  eggPreservation,
  eggTransportation,
} from "./vegetables/Text.js";

const Eggs = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.icon_Container}></View>

        <ImageBackground
          source={require("../../assets/vegs/eggs.jpeg")}
          style={{ width: "100%", height: 300, resizeMode: "cover" }}
        ></ImageBackground>

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
            <Text style={styles.text}>{EggIntro.introduction}</Text>

            {EggIntro.eggTypes.map((vegetable, index) => (
              <View key={index} style={styles.vegetableContainer}>
                <Image source={vegetable.image} style={styles.image} />
                <View style={styles.textContainer}>
                  <Text
                    style={{ color: "black", fontSize: 18, fontWeight: "bold" }}
                  >
                    {vegetable.type}
                  </Text>
                  <Text>{vegetable.description}</Text>
                </View>
              </View>
            ))}

            <Text>{EggIntro.conclusion}</Text>
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

            {Object.entries(eggPreservation).map(([method, steps]) => (
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
              {eggTransportation.introduction}
            </Text>

            {eggTransportation.transportationMethods.map((method, index) => (
              <View key={index} style={styles.methodContainer}>
                <Text style={styles.method}>{method.method}</Text>
                <Text style={styles.subHeading}>Process:</Text>
                {method.process.map((step, stepIndex) => (
                  <Text
                    key={stepIndex}
                    style={styles.textItem}
                  >{`\u2022 ${step}`}</Text>
                ))}
                <Text style={styles.subHeading}>Pros:</Text>
                {method.pros.map((pro, proIndex) => (
                  <Text
                    key={proIndex}
                    style={styles.textItem}
                  >{`\u2022 ${pro}`}</Text>
                ))}
                <Text style={styles.subHeading}>Cons:</Text>
                {method.cons.map((con, conIndex) => (
                  <Text
                    key={conIndex}
                    style={styles.textItem}
                  >{`\u2022 ${con}`}</Text>
                ))}
              </View>
            ))}

            <Text style={styles.conclusion}>
              {eggTransportation.conclusion}
            </Text>
          </View>

          <View style={{ width: "100%", height: 70 }}></View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Eggs;

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
  },
  image: {
    width: 100,
    height: "100%",
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  introduction: {
    fontSize: 16,
    marginBottom: 10,
  },
  methodContainer: {
    marginBottom: 20,
  },
  method: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  textItem: {
    fontSize: 14,
    marginLeft: 20,
    marginBottom: 4,
  },
  conclusion: {
    fontSize: 16,
    marginTop: 20,
  },
});
