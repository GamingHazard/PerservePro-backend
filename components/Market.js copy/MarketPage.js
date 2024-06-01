// MyTabView.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Market from "./Market";
import Transport from "./Transport";
import { useNavigation } from "@react-navigation/native";

const initialLayout = { width: Dimensions.get("window").width };

const MarketComponent = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.scene]}>
      <SafeAreaView style={styles.container}>
        <Market addAction={() => navigation.navigate("MarketForm")} />
      </SafeAreaView>
    </View>
  );
};

const TransportComponent = () => {
  return (
    <View style={[styles.scene]}>
      <SafeAreaView style={styles.container}>
        <Transport />
      </SafeAreaView>
    </View>
  );
};

const MarketPage = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "market", title: "Market" },
    { key: "transport", title: "Transport" },
  ]);

  const renderScene = SceneMap({
    market: Market,
    transport: Transport,
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
          labelStyle={{ color: "white" }}
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
  },
  titleTxt: { color: "black", fontSize: 20, fontWeight: "bold" },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default MarketPage;
