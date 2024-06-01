// HourlyWeather.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

const DailyWeather = ({ apiKey, latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchHourlyWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        );
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setErrorMsg("Error fetching hourly weather data");
        setLoading(false);
      }
    };

    fetchHourlyWeatherData();
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
      <Text style={styles.titleText}>Hourly Weather Forecast</Text>
      {/* Render weather data here */}
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
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default DailyWeather;
