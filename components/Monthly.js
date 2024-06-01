// Weather.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

const MonthlyWeather = ({ apiKey, latitude, longitude }) => {
  const [climateData, setClimateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchClimateData = async () => {
      try {
        const response = await axios.get(
          `https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        );
        setClimateData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setErrorMsg("Error, connect to Internet and try again");
        setLoading(false);
      }
    };

    fetchClimateData();
  }, [apiKey, latitude, longitude]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Climate Forecast for {climateData.city.name}
      </Text>
      {climateData.list.map((item, index) => (
        <View key={index} style={styles.forecastItem}>
          <Text>Date: {new Date(item.dt * 1000).toLocaleDateString()}</Text>
          <Text>Temperature: {item.temp.day}°C</Text>
          <Text>Description: {item.weather[0].description}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  forecastItem: {
    marginBottom: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default MonthlyWeather;
