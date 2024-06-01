import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import ImagePickerComponent from "./ImageUpload";
import axiosInstance from "./axiosInstance";
import LoadingScreen from "./LoadingScreen"; // Import the LoadingScreen component

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleImageSelect = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const handleSubmit = async () => {
    if (description.trim() === "") {
      Alert.alert("Error", "Please enter a description");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);

    if (selectedImage) {
      try {
        const uriParts = selectedImage.split(".");
        const fileType = uriParts[uriParts.length - 1];

        formData.append("image", {
          uri: selectedImage,
          name: `image.${fileType}`,
          type: `image/${fileType}`,
        });
      } catch (error) {
        console.error("Error processing the selected image:", error);
        Alert.alert("Error", "Failed to process the selected image.");
        return;
      }
    }

    setLoading(true); // Show loading animation

    try {
      const response = await axiosInstance.post(
        `http://preservepro-backend.onrender.com/posts`,
        formData
      );
      setLoading(false); // Hide loading animation
      console.log("Post successful:", response.data);
      Alert.alert("Success", "Post created successfully.");
      setDescription("");
      setSelectedImage(null);
    } catch (error) {
      setLoading(false); // Hide loading animation
      console.error("Error posting data:", error);
      Alert.alert("Error", "Failed to post data. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <ImagePickerComponent
        aspectRatio={[16, 16]}
        placeholderText="Tap to select an image"
        onImageSelect={handleImageSelect}
      />
      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
        </View>
      )}
      <View style={styles.descriptionContainer}>
        <TextInput
          placeholder="Enter description"
          multiline={true}
          value={description}
          onChangeText={setDescription}
          style={styles.textInput}
        />
      </View>
      <TouchableOpacity style={styles.postButton} onPress={handleSubmit}>
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>
      {loading && <LoadingScreen visible={loading} />}{" "}
      {/* Show LoadingScreen when loading */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "lightgrey",
    top: 20,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  descriptionContainer: {
    padding: 10,
    backgroundColor: "white",
    elevation: 8,
    marginVertical: 20,
    borderRadius: 8,
  },
  textInput: {
    height: 100,
    textAlignVertical: "top",
  },
  postButton: {
    width: "30%",
    height: 50,
    elevation: 8,
    backgroundColor: "#65000B",
    justifyContent: "center",
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
  },
  postButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default CreatePost;
