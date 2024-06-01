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
  StemVegetables,
  StemVegetablePreservation,
  StemVegetableTransportation,
} from "../vegetables/Text.js";
import IntroImg from "./Introimg.js";

const StemVegs = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.icon_Container}></View>

        <ImageBackground
          source={require("../../../assets/vegs/stemVegs.jpeg")}
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
            <Text style={styles.text}>{StemVegetables.introduction}</Text>

            <IntroImg
              vegImg={require("../../../assets/vegs/stemVegs.jpeg")}
              bio={StemVegetables.celery}
            />
            <IntroImg
              vegImg={require("../../../assets/vegs/stemVegs.jpeg")}
              bio={StemVegetables.leeks}
            />
            <IntroImg
              vegImg={require("../../../assets/vegs/stemVegs.jpeg")}
              bio={StemVegetables.fennel}
            />
            <IntroImg
              vegImg={require("../../../assets/vegs/stemVegs.jpeg")}
              bio={StemVegetables.chard}
            />

            <Text>{StemVegetables.conclusion}</Text>
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

            {Object.entries(StemVegetablePreservation).map(
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

            {Object.entries(StemVegetableTransportation).map(
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

export default StemVegs;

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
});
