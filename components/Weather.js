// MyTabView.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import MonthlyWeather from "./Monthly";
import * as Location from "expo-location";
import WeeklyWeather from "./Weekly";
import DailyWeather from "./Daily";

const initialLayout = { width: Dimensions.get("window").width };

const Daily = () => {
  const API_KEY = "d80d65282eb776587a55a0370e7794b5";

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  return (
    <View style={[styles.scene]}>
      <SafeAreaView style={styles.container}>
        {location && (
          <DailyWeather
            apiKey={API_KEY}
            latitude={location.latitude}
            longitude={location.longitude}
          />
        )}
        {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
      </SafeAreaView>
    </View>
  );
};

const Weekly = () => {
  const API_KEY = "92f36084c2bb51a382b40339c4ce6a30";

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  return (
    <View style={[styles.scene]}>
      <SafeAreaView style={styles.container}>
        {location && (
          <WeeklyWeather
            apiKey={API_KEY}
            latitude={location.latitude}
            longitude={location.longitude}
          />
        )}
        {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
      </SafeAreaView>
    </View>
  );
};

const Monthly = () => {
  const API_KEY = "4624959db0371e0c87b10c32d2bd37de";

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  return (
    <View style={[styles.scene]}>
      <SafeAreaView style={styles.container}>
        {location && (
          <MonthlyWeather
            apiKey={API_KEY}
            latitude={location.latitude}
            longitude={location.longitude}
          />
        )}
        {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
      </SafeAreaView>
    </View>
  );
};

const Weather = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "daily", title: "Daily" },
    { key: "weekly", title: "Weekly" },
    { key: "monthly", title: "Monthly" },
  ]);

  const renderScene = SceneMap({
    daily: Daily,
    weekly: Weekly,
    monthly: Monthly,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: "white" }}
          style={{
            backgroundColor: "#65000B",
            top: 30,
            elevation: 8,
          }}
          labelStyle={{ color: "white" }} // Set the tab text color to black
          activeColor="white"
          inactiveColor="#7ABA78"
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    padding: 10,
  },
  titleTxt: { color: "black", fontSize: 20, fontWeight: "bold" },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default Weather;
