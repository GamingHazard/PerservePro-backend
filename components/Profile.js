import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
// import * as ImagePicker from "expo-image-picker";
import axiosInstance from "./axiosInstance";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ImagePickerComponent from "./ImageUpload";
import Btn from "./Btn";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    contacts: "",
    region: "",
    FarmName: "",
    image: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await axiosInstance.get(
        "http://preservepro-backend.onrender.com/profile"
      );
      setProfileData(response.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleInputChange = (name, value) => {
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", profileData.name);
    formData.append("email", profileData.email);
    formData.append("contacts", profileData.contacts);
    formData.append("region", profileData.region);
    formData.append("FarmName", profileData.FarmName);

    if (selectedImage) {
      const filename = selectedImage.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      formData.append("image", {
        uri: selectedImage,
        name: filename,
        type,
      });
    }

    try {
      await axiosInstance.post(
        "http://preservepro-backend.onrender.com/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.error("success updating profile:", error);
      Alert.alert("Success", "Profile updated successfully");
      fetchProfileData();
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile");
    }
  };

  return (
    <View style={styles.container}>
      {isFormVisible ? (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={profileData.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={profileData.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Contacts"
            value={profileData.contacts}
            onChangeText={(text) => handleInputChange("contacts", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Region"
            value={profileData.region}
            onChangeText={(text) => handleInputChange("region", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Farm Name"
            value={profileData.FarmName}
            onChangeText={(text) => handleInputChange("FarmName", text)}
          />
          <Btn
            btnStyle={styles.submit}
            action={handleSubmit}
            btnText={"Update"}
          />
        </View>
      ) : (
        <ScrollView>
          <View style={styles.profileContainer}>
            <View style={styles.imageSection}>
              <ImagePickerComponent
                aspectRatio={[16, 16]}
                placeholderText="Tap to select an image"
                ImgContainer={styles.imageContainer}
                imgStyl={styles.img}
                btnSyl={styles.imgBtn}
              />
              {selectedImage && (
                <View style={styles.imageContainer}>
                  <Image source={{ uri: selectedImage }} style={styles.img} />
                </View>
              )}
            </View>
            <View style={styles.infoSection}>
              <View style={styles.infoHeader}>
                <Text style={styles.infoTitle}>Personal Info</Text>
                <TouchableOpacity onPress={() => setIsFormVisible(true)}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              </View>
              <InfoTab
                icon="account-outline"
                label="Username"
                value="@kisibojonathan"
              />
              <InfoTab
                icon="email-outline"
                label="Email"
                value="kisibojonatha@gmail.com"
              />
              <InfoTab
                icon="phone-outline"
                label="Contact"
                value="0774205474"
              />
              <InfoTab icon="barn" label="Farm" value="Sabunyo Farm limited" />

              <View style={styles.infoHeader}>
                <Text style={styles.infoTitle}>Utilities</Text>
              </View>
              <InfoTab
                icon="help-circle-outline"
                label="Help"
                onPress={() => navigation.navigate("Help")}
              />
              <InfoTab
                icon="logout"
                label="Logout"
                onPress={() => navigation.navigate("Home")}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const InfoTab = ({ icon, label, value, onPress }) => (
  <TouchableOpacity style={styles.tabs} onPress={onPress}>
    <View style={styles.tabLeft}>
      <MaterialCommunityIcons name={icon} size={30} color="#65000B" />
      <Text style={styles.tabLabel}>{label}</Text>
    </View>
    <View style={styles.tabRight}>
      {value ? (
        <Text>{value}</Text>
      ) : (
        <MaterialCommunityIcons name="arrow-right" size={30} color="#65000B" />
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    top: 20,
  },
  formContainer: {
    marginBottom: 20,
    top: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 10,
    width: "100%",
    borderRadius: 8,
  },
  profileContainer: {
    marginTop: 20,
  },
  imageSection: {
    backgroundColor: "white",
    elevation: 8,
    marginBottom: 30,
    elevation: 8,
  },
  imageContainer: {
    width: "100%",
    alignSelf: "center",
    top: 20,
  },
  img: { height: 200, width: 250 },
  imgBtn: { alignSelf: "center", top: 30 },
  infoSection: {
    padding: 20,
  },
  infoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "auto",
  },
  infoTitle: {
    fontSize: 20,
  },
  editText: {
    alignSelf: "flex-end",
  },
  tabs: {
    height: 70,
    width: "100%",
    backgroundColor: "whitesmoke",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 2,
    borderRadius: 8,
    elevation: 8,
  },
  tabLeft: {
    width: "40%",
    flexDirection: "row",
  },
  tabLabel: {
    top: 5,
    left: 5,
  },
  tabRight: {
    width: "60%",
    alignItems: "flex-end",
  },
  submit: {
    width: "100%",
    height: 40,
  },
});

export default Profile;
