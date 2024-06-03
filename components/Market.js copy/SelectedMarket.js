import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
// import { ip } from "../../consts";

const SelectedMarket = () => {
  const navigation = useNavigation();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch customers from the backend
    axios
      .get("http://preservepro-backend.onrender.com/customers")
      .then((response) => {
        // Handle successful response
        setCustomers(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching customers:", error);
        Alert.alert("Error", "Failed to fetch customers");
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapcontainer}>
        <Text>Selected Market Map Image</Text>
      </View>
      <Text style={styles.title}>Customers</Text>
      <ScrollView>
        {customers.map((customer, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("MarketCustomersInfo", {
                customerName: customer.name,
              })
            }
          >
            <View style={styles.tab}>
              <Text style={styles.customerName}>{customer.name}</Text>
              <MaterialCommunityIcons
                name="minus"
                size={30}
                color="white"
                style={styles.delete}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate("MarketCustomersForm")}
      >
        <View style={styles.addBtn}>
          <MaterialCommunityIcons
            name="plus"
            size={30}
            color="white"
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SelectedMarket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "lightgrey",
    paddingTop: 10,
    top: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  tab: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
    elevation: 8,
    marginVertical: 5,
  },
  customerName: {
    fontSize: 18,
  },
  delete: {
    backgroundColor: "#65000B",
    borderRadius: 25,
    padding: 5,
  },
  mapcontainer: {
    height: 300,
    width: "100%",
    elevation: 8,
    backgroundColor: "white",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  addBtn: {
    backgroundColor: "#65000B",
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    position: "absolute",
    bottom: 20,
    right: 20,
    elevation: 10,
  },
  icon: {
    alignSelf: "center",
  },
});
