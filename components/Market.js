// Market.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import axiosInstance from "./axiosInstance";

const Market = () => {
  const [records, setRecords] = useState(null); // Initialize as null to handle loading state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axiosInstance.get("/market"); // Adjust endpoint as needed
        setRecords(response.data);
      } catch (error) {
        setError("Failed to fetch records.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!records) {
    return null; // Or some fallback UI
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Markets</Text>
      {Object.entries(records).map(([category, items]) => (
        <View key={category}>
          <Text style={styles.category}>{category}</Text>
          {items.map((record, index) => (
            <View key={index} style={styles.record}>
              <Text style={styles.title}>{record.title}</Text>
              <Text>{record.description}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "lightblue",
    width: "100%",
    top: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  category: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  record: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  title: {
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
});

export default Market;
