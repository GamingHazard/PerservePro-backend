import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Inputs from "../reusables/Inputs";
import Btn from "../reusables/Btn";
import axios from "axios";
import { ip } from "../../consts";

const AddMarket = () => {
  const [marketName, setMarketName] = useState("");
  const [district, setDistrict] = useState("");
  const [region, setRegion] = useState("");

  const handleAddMarket = () => {
    if (
      marketName.trim() === "" ||
      district.trim() === "" ||
      region.trim() === ""
    ) {
      Alert.alert("Error", "Please fill in all fields");
    } else {
      const data = {
        marketName: marketName,
        district: district,
        region: region,
      };

      axios
        .post(`${ip}/markets`, data)
        .then((response) => {
          console.log("Data sent successfully:", response.data);
          Alert.alert("Success", "Market added successfully");
          setMarketName("");
          setDistrict("");
          setRegion("");
        })
        .catch((error) => {
          console.error("Error adding market:", error);
          Alert.alert("Error", "Failed to add market");
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}></View>
      <View style={styles.addBtn}>
        <TouchableOpacity>
          <MaterialCommunityIcons
            style={{ alignSelf: "center" }}
            name="camera"
            size={30}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Market Name</Text>
      <Inputs
        onChangeText={(text) => setMarketName(text)}
        value={marketName}
        placeholder="Name..."
        inputStyle={styles.inputs}
      />
      <Text style={styles.label}>District</Text>
      <Inputs
        onChangeText={(text) => setDistrict(text)}
        value={district}
        placeholder="District..."
        inputStyle={styles.inputs}
      />
      <Text style={styles.label}>Region</Text>
      <Inputs
        onChangeText={(text) => setRegion(text)}
        value={region}
        placeholder="Region..."
        inputStyle={styles.inputs}
      />
      <Btn btnText="Add" onPress={handleAddMarket} btnStyle={styles.btn} />
    </View>
  );
};

export default AddMarket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "lightgrey",
    top: 10,
    padding: 10,
  },
  imgContainer: {
    height: 280,
    width: "100%",
    elevation: 8,
    backgroundColor: "white",
  },
  addBtn: {
    backgroundColor: "#65000B",
    height: 60,
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    top: -30,
    alignSelf: "flex-end",
    marginHorizontal: 20,
    elevation: 10,
    zIndex: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  inputs: {
    marginVertical: 10,
  },
  btn: {
    marginTop: 20,
    height: 40,
  },
});
