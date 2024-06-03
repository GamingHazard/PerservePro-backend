// DailyWeather.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

const WeeklyWeather = ({ apiKey, latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=14&appid=${apiKey}`
        );
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setErrorMsg("Error fetching weekly weather data");
        setLoading(false);
      }
    };

    fetchWeatherData();
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
      <Text style={styles.titleText}>Daily Weather Forecast</Text>
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

export default WeeklyWeather;
