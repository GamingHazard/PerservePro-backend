import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Mycard from "../Card";
// import Mycard from "../reusables/Card";

const AllVegetables = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView style={{ top: -10 }}>
        <TouchableOpacity onPress={() => navigation.navigate("FlowerVegs")}>
          <Mycard
            title="Flower Vegetables"
            imgurl={require("../../assets/vegs/flowerVegs.jpeg")}
            cardStyle={{ width: "93%", height: 400, elevation: 8 }}
            imgStyle={{ height: 280, width: "100%", top: -40 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("FruitVegs")}>
          <Mycard
            title="Fruit Vegetables"
            imgurl={require("../../assets/vegs/fruitsVegs.jpeg")}
            cardStyle={{ width: "93%", height: 400, elevation: 8 }}
            imgStyle={{ height: 280, width: "100%", top: -40 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("LeafyVegs")}>
          <Mycard
            title="Leafy Vegetables"
            imgurl={require("../../assets/vegs/leafyVegs.jpeg")}
            cardStyle={{ width: "93%", height: 400, elevation: 8 }}
            imgStyle={{ height: 280, width: "100%", top: -40 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("RootVegs")}>
          <Mycard
            title="Root Vegetables"
            imgurl={require("../../assets/vegs/rootVegs.jpeg")}
            cardStyle={{ width: "93%", height: 400, elevation: 8 }}
            imgStyle={{ height: 280, width: "100%", top: -40 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("TuberVegs")}>
          <Mycard
            title="Tuber Vegetables"
            imgurl={require("../../assets/vegs/tuberVegs.jpeg")}
            cardStyle={{ width: "93%", height: 400, elevation: 8 }}
            imgStyle={{ height: 280, width: "100%", top: -40 }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Mycard
            title="Bulb Vegetables"
            imgurl={require("../../assets/vegs/bulbVegs.jpeg")}
            cardStyle={{ width: "93%", height: 400, elevation: 8 }}
            imgStyle={{ height: 280, width: "100%", top: -40 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("StemVegs")}>
          <Mycard
            title="Stem Vegetables"
            imgurl={require("../../assets/vegs/stemVegs.jpeg")}
            cardStyle={{ width: "93%", height: 400, elevation: 8 }}
            imgStyle={{ height: 280, width: "100%", top: -40 }}
          />
        </TouchableOpacity>
        <View style={{ width: "100%", height: 40 }}></View>
      </ScrollView>
    </View>
  );
};

export default AllVegetables;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 35,
    backgroundColor: "whitesmoke",
  },
  titleContainer: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
