import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import axios from "axios";
// import { ip } from "../../consts";

const MarketCustomersInfo = () => {
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://preservepro-backend.onrender.com/customers"
      );
      setCustomerData(response.data);
    } catch (error) {
      console.error("Error fetching customer data:", error);
      Alert.alert("Error", "Failed to fetch customer data");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imgContainer}></View>

      {customerData ? (
        <>
          <Text style={styles.label}>Customer Name</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>{customerData.name}</Text>
          </View>

          <Text style={styles.label}>Customer Number</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>{customerData.number}</Text>
          </View>

          <Text style={styles.label}>Sold Products</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              {customerData.products.join(", ")}
            </Text>
          </View>
        </>
      ) : (
        <Text style={styles.loadingText}>Loading customer data...</Text>
      )}
    </ScrollView>
  );
};

export default MarketCustomersInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "lightgrey",
    padding: 10,
  },
  imgContainer: {
    height: 280,
    width: "100%",
    elevation: 8,
    backgroundColor: "white",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  infoContainer: {
    height: 50,
    width: "100%",
    elevation: 9,
    backgroundColor: "white",
    padding: 10,
    justifyContent: "center",
    marginVertical: 10,
  },
  infoText: {
    fontSize: 16,
  },
  loadingText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
});
