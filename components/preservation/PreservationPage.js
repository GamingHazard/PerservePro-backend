import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Mycard from "../Card";

const categories = [
  {
    title: "Vegetables",
    imgurl: require("../../assets/vegetables.jpeg"),
    screen: "Vegetables",
  },
  {
    title: "Fruits",
    imgurl: require("../../assets/fruits.jpeg"),
    screen: "Fruits",
  },
  { title: "Meat", imgurl: require("../../assets/meat.jpeg"), screen: "Meat" },
  { title: "Eggs", imgurl: require("../../assets/eggs.jpeg"), screen: "Eggs" },
  { title: "Milk", imgurl: require("../../assets/milk.jpeg"), screen: "Milk" },
  {
    title: "Cereals",
    imgurl: require("../../assets/cereals.jpeg"),
    screen: "Cereals",
  },
  {
    title: "Coffee",
    imgurl: require("../../assets/coffee.jpeg"),
    screen: "Coffee",
  },
];

const PreservationPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(category.screen)}
          >
            <Mycard
              cardStyle={styles.card}
              imgStyle={styles.imageStyle}
              title={category.title}
              imgurl={category.imgurl}
            />
          </TouchableOpacity>
        ))}
        <View style={styles.imageContainer}>
          <Image
            style={styles.mainImage}
            source={require("../../assets/main.png")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PreservationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
    top: 30,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  mainImage: {
    width: "100%",
    height: 100,
    marginBottom: 10,
  },
  card: {
    elevation: 8,
    width: "91%",
    height: 400,
    alignSelf: "center",
    marginBottom: 16,
  },
  imageStyle: {
    height: 250,
    resizeMode: "cover",
    width: "100%",
  },
});
