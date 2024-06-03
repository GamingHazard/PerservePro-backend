import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Settings = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.account}>
          <SettingsItem
            icon={<FontAwesome5 name="user" size={24} color="black" />}
            label="Profile"
            onPress={() => navigation.navigate("Profile")}
          />
          <SettingsItem
            icon={
              <MaterialCommunityIcons
                name="door-open"
                size={24}
                color="black"
              />
            }
            label="Log Out"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support & About</Text>
        <View style={styles.account}>
          <SettingsItem
            icon={<FontAwesome5 name="question" size={20} color="black" />}
            label="Help & support"
            onPress={() => navigation.navigate("Help")}
          />
          <SettingsItem
            icon={
              <MaterialCommunityIcons
                name="alert-circle-outline"
                size={24}
                color="black"
              />
            }
            label="Terms & policies"
            onPress={() => navigation.navigate("Terms")}
          />
        </View>
      </View>
    </View>
  );
};

const SettingsItem = ({ icon, label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.items}>
    <View style={styles.icon}>{icon}</View>
    <View style={styles.name}>
      <Text>{label}</Text>
    </View>
  </TouchableOpacity>
);

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 20,
  },
  section: {
    backgroundColor: "white",
    width: "100%",
    paddingVertical: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    padding: 10,
  },
  account: {
    paddingLeft: 20,
  },
  items: {
    flexDirection: "row",
    height: 50,
  },
  icon: {
    width: "15%",
    justifyContent: "center",
  },
  name: {
    width: "85%",
    justifyContent: "center",
  },
});
