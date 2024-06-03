import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";
import axios from "axios";
import Inputs from "../Inputs";
import Btn from "../Btn";
import ImagePickerComponent from "../ImageUpload";
import LoadingScreen from "../LoadingScreen"; // Import LoadingScreen

const MarketCustomersForm = () => {
  const [customerName, setCustomerName] = useState("");
  const [contact, setContact] = useState("");
  const [products, setProducts] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleImageSelect = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const handleAddCustomer = async () => {
    if (!customerName.trim() || !contact.trim() || !products.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const data = {
      customerName: customerName,
      contact: contact,
      products: products,
    };

    setLoading(true); // Show loading animation

    try {
      const response = await axios.post(
        "http://preservepro-backend.onrender.com/customers",
        data
      );
      console.log("Customer successfully saved:", response.data);
      Alert.alert("Success", "Customer added successfully");
      // Clear the form
      setCustomerName("");
      setContact("");
      setProducts("");
      setSelectedImage(null);
    } catch (error) {
      console.error("Error adding customer:", error);
      Alert.alert("Error", "Failed to add customer");
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
      <Text>Customer Name</Text>
      <Inputs
        onChangeText={(text) => setCustomerName(text)}
        value={customerName}
        placeholder={"Name..."}
        inputStyle={styles.inputs}
      />
      <Text>Contact</Text>
      <Inputs
        onChangeText={(text) => setContact(text)}
        value={contact}
        keyboardType={"numeric"}
        placeholder={"Contact..."}
        inputStyle={styles.inputs}
      />
      <Text>Products</Text>
      <Inputs
        onChangeText={(text) => setProducts(text)}
        value={products}
        placeholder={"Products..."}
        inputStyle={styles.inputs}
      />
      <Btn btnText={"Add"} btnStyle={styles.btn} onPress={handleAddCustomer} />
      {loading && <LoadingScreen visible={loading} />}
      {/* Show LoadingScreen when loading */}
    </View>
  );
};

export default MarketCustomersForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "lightgrey",
    top: 20,
    padding: 10,
  },
  imgcontainer: {
    height: 280,
    width: "100%",
    elevation: 8,
    backgroundColor: "white",
  },
  inputs: {
    marginBottom: 10,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    top: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  btn: {
    height: 50,
    width: "100%",
    backgroundColor: "#65000B",
  },
  imgSty: { height: 55 },
});
