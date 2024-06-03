import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LocalNews from "./News";

const HomePage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topNav}>
        <View style={styles.imgLogoContainer}>
          <Image style={styles.logo} source={require("../assets/logo3.png")} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.profileContainer}
        >
          <Image
            style={styles.profileImage}
            source={require("../assets/avatar.jpg")}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Preservation Page")}
          style={styles.guide}
        >
          <Image
            style={styles.guideImage}
            source={require("../assets/farm1.jpg")}
          />
          <Text style={styles.guideText}>Preservation Guide</Text>
        </TouchableOpacity>

        <View style={styles.tipsContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("StoreManagement")}
            style={styles.tipCard}
          >
            <Image
              style={styles.tipImage}
              source={require("../assets/tip3.jpg")}
            />
            <Text style={styles.tipText}>Store</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("PestsDiseases")}
            style={styles.tipCard}
          >
            <Image
              style={styles.tipImage}
              source={require("../assets/pest5.jpg")}
            />
            <Text style={styles.tipText}>Pests & Diseases</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Weather</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Weather")}
          style={styles.weatherContainer}
        >
          <Image
            source={require("../assets/wether.png")}
            style={styles.weatherImage}
          />
        </TouchableOpacity>

        <View style={styles.newsContainer}>
          <Text style={styles.sectionTitle}>News Updates</Text>
          <LocalNews />
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        {navItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(item.route)}
            style={styles.navItem}
          >
            <MaterialCommunityIcons
              style={styles.navIcon}
              name={item.icon}
              size={30}
              color="black"
            />
            <Text style={styles.navText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const navItems = [
  { route: "Community", icon: "account-multiple-outline", label: "Community" },
  { route: "Notifications", icon: "bell-outline", label: "Notifications" },
  { route: "MarketPage", icon: "store-outline", label: "Market" },
  { route: "Settings", icon: "cog-outline", label: "Settings" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topNav: {
    backgroundColor: "#65000B",
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  imgLogoContainer: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  profileContainer: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    height: 60,
  },
  profileImage: {
    width: "50%",
    height: 40,
    borderRadius: 60,
  },
  scrollContent: {
    alignItems: "center",
  },
  guide: {
    elevation: 8,
    width: 400,
    height: 360,
    alignItems: "center",
    justifyContent: "center",
  },
  guideImage: {
    width: "95%",
    height: 300,
    resizeMode: "stretch",
    borderRadius: 8,
  },
  guideText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  tipsContainer: {
    width: "100%",
    height: 230,
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-evenly",
  },
  tipCard: {
    width: "45%",
    height: "100%",
    backgroundColor: "white",
    elevation: 10,
    borderRadius: 8,
  },
  tipImage: {
    width: "100%",
    height: "78.5%",
    resizeMode: "cover",
    borderRadius: 8,
  },
  tipText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 26,
    marginVertical: 20,
    alignSelf: "center",
  },
  weatherContainer: {
    width: "100%",
    height: 400,
    elevation: 8,
    marginVertical: 15,
    backgroundColor: "#65000B",
    alignItems: "center",
    justifyContent: "center",
  },
  weatherImage: {
    width: "100%",
    height: "100%",
  },
  newsContainer: {
    width: "100%",
    padding: 10,
    marginVertical: 15,
  },
  bottomNav: {
    width: "100%",
    backgroundColor: "white",
    height: 70,
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-evenly",
    elevation: 10,
    alignItems: "center",
  },
  navItem: {
    justifyContent: "center",
    alignContent: "center",
  },
  navIcon: {
    alignSelf: "center",
  },
  navText: {
    alignSelf: "center",
  },
});

export default HomePage;
