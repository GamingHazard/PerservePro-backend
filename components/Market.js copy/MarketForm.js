import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axiosInstance from "../axiosInstance";
import ImagePickerComponent from "../ImageUpload";
import Btn from "../Btn";
import LoadingScreen from "../LoadingScreen";

const MarketForm = () => {
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [image, setImage] = useState(null); // Store image URI
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelect = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const handleSubmit = async () => {
    if (!name || !description || !region || !selectedImage) {
      Alert.alert("Error", "Please fill in all fields and select an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("region", region);

    try {
      const uriParts = selectedImage.split(".");
      const fileType = uriParts[uriParts.length - 1];

      formData.append("image", {
        uri: selectedImage,
        name: `image.${fileType}`,
        type: `image/${fileType}`,
      });

      setLoading(true); // Show loading animation

      const response = await axiosInstance.post(
        "http://preservepro-backend.onrender.com/markets",
        formData
      );
      console.log("Market successfully saved:", response.data);
      Alert.alert("Success", "Market created successfully");
      // Clear the form
      setName("");
      setDistrict("");
      setRegion("");
      setSelectedImage(null);
    } catch (error) {
      console.log("Failed to create market:", error);
      Alert.alert("Error", "Failed to create market");
    } finally {
      setLoading(false); // Hide loading animation
    }
  };

  return (
    <View style={styles.container}>
      <ImagePickerComponent
        aspectRatio={[16, 16]}
        placeholderText="Tap to select an image"
        onImageSelect={handleImageSelect}
        btnSyl={styles.imgSty}
        ImgContainer={styles.imageContainer}
      />
      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
        </View>
      )}
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter market name"
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        multiline={true}
        onChangeText={setDistrict}
        placeholder="Enter market description"
      />
      <Text style={styles.label}>Region</Text>
      <TextInput
        style={styles.input}
        value={region}
        onChangeText={setRegion}
        placeholder="Enter Region"
      />
      <Btn action={handleSubmit} btnText={"Add Market"} btnStyle={styles.btn} />
      {loading && <LoadingScreen visible={loading} />}
      {/* Show LoadingScreen when loading */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "whitesmoke",
    top: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  btn: {
    height: 40,
    width: "100%",
    backgroundColor: "#65000B",
  },
  imgSty: {
    height: 55,
  },
});

export default MarketForm;
