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
  BulbVegetables,
  BulbVegetablePreservation,
  BulbVegetableTransportation,
} from "./Text.js";
import IntroImg from "./Introimg.js";

const BulbVegs = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.icon_Container}></View>

        <ImageBackground
          source={require("../../../assets/vegs/bulbVegs.jpeg")}
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
            <Text style={styles.text}>{BulbVegetables.introduction}</Text>

            <IntroImg
              vegImg={require("../../../assets/vegs/bulbVegs.jpeg")}
              bio={BulbVegetables.onions}
            />
            <IntroImg
              vegImg={require("../../../assets/vegs/bulbVegs.jpeg")}
              bio={BulbVegetables.garlic}
            />
            <IntroImg
              vegImg={require("../../../assets/vegs/bulbVegs.jpeg")}
              bio={BulbVegetables.shallots}
            />
            <IntroImg
              vegImg={require("../../../assets/vegs/bulbVegs.jpeg")}
              bio={BulbVegetables.leeks}
            />
            <IntroImg
              vegImg={require("../../../assets/vegs/bulbVegs.jpeg")}
              bio={BulbVegetables.scallions}
            />

            <Text>{BulbVegetables.conclusion}</Text>
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

            {Object.entries(BulbVegetablePreservation).map(
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

            <Text></Text>
            <Text></Text>
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

            {Object.entries(BulbVegetableTransportation).map(
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

          <Button title="Back" />

          <View style={{ width: "100%", height: 70 }}></View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BulbVegs;

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
