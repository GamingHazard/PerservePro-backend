import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Market = ({ addAction }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("MarketForm")}>
        <View style={styles.addBtn}>
          <MaterialCommunityIcons
            style={{ alignSelf: "center" }}
            name="plus"
            size={30}
            color="white"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("SelectedMarket")}
        style={styles.tab}
      >
        <View style={{ width: "70%" }}>
          <Text>Bweyogelele</Text>
        </View>
        <View
          style={{
            width: "30%",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Text>7</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("SelectedMarket")}
        style={styles.tab}
      >
        <View style={{ width: "70%" }}>
          <Text>Kireka</Text>
        </View>
        <View
          style={{
            width: "30%",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Text>5</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("SelectedMarket")}
        style={styles.tab}
      >
        <View style={{ width: "70%" }}>
          <Text>Nakasero</Text>
        </View>
        <View
          style={{
            width: "30%",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Text>3</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Market;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "lightgrey",
    top: 30,
  },
  addBtn: {
    backgroundColor: "#65000B",
    height: 60,
    width: "15%",
    justifyContent: "center",
    alignContent: "center",

    alignSelf: "center",
    marginHorizontal: 20,
    borderRadius: 50,
    elevation: 10,
  },
  tab: {
    width: "100%",
    padding: 10,
    justifyContent: "center",
    elevation: 8,
    backgroundColor: "white",
    height: "auto",
    marginVertical: 10,
    flexDirection: "row",
  },
});
