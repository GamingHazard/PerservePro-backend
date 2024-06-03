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
  RootVegetables,
  RootVegetablepreservation,
  RootVegetablesTransportation,
} from "../vegetables/Text.js";
import IntroImg from "./Introimg.js";

const RootVegs = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.icon_Container}></View>

        <ImageBackground
          source={require("../../../assets/vegs/rootVegs.jpeg")}
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
            <Text style={styles.text}>{RootVegetables.introduction}</Text>

            <IntroImg
              vegImg={require("../../../assets/vegs/rootVegs.jpeg")}
              bio={RootVegetables.arrowroot}
            />
            <IntroImg
              vegImg={require("../../../assets/vegs/rootVegs.jpeg")}
              bio={RootVegetables.taro}
            />
            <IntroImg
              vegImg={require("../../../assets/vegs/rootVegs.jpeg")}
              bio={RootVegetables.turnips}
            />
            <IntroImg
              vegImg={require("../../../assets/vegs/rootVegs.jpeg")}
              bio={RootVegetables.radishes}
            />
            <IntroImg
              vegImg={require("../../../assets/vegs/rootVegs.jpeg")}
              bio={RootVegetables.beets}
            />
            <IntroImg
              vegImg={require("../../../assets/vegs/rootVegs.jpeg")}
              bio={RootVegetables.carrots}
            />

            <Text>{RootVegetables.conclusion}</Text>
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

            {Object.entries(RootVegetablepreservation).map(
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

            {Object.entries(RootVegetablesTransportation).map(
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

export default RootVegs;

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
