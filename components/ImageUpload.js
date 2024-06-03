import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ImagePickerComponent = ({
  aspectRatio,
  quality,
  onImageSelected,
  btnSyl,
  ImgContainer,
  imgStyl,
}) => {
  const [image, setImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const pickImageFromGallery = async () => {
    if (hasPermission === false) {
      Alert.alert(
        "Permission denied",
        "You need to grant media library permissions to use this feature."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: aspectRatio || [4, 3], // Default aspect ratio
      quality: quality || 1, // Default quality
    });

    handleImagePickerResult(result);
  };

  const takeImageFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "You need to grant camera permissions to use this feature."
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: aspectRatio || [4, 3], // Default aspect ratio
      quality: quality || 1, // Default quality
    });

    handleImagePickerResult(result);
  };

  const handleImagePickerResult = (result) => {
    if (!result.cancelled) {
      setImage(result.uri);
      if (onImageSelected) {
        onImageSelected(result.uri);
      }
    }
  };

  return (
    <View>
      <View style={[styles.container, ImgContainer]}>
        {image && (
          <Image source={{ uri: image }} style={[styles.image, imgStyl]} />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, btnSyl]}
          onPress={pickImageFromGallery}
        >
          <MaterialCommunityIcons
            style={{ alignSelf: "center" }}
            name="image"
            size={30}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, btnSyl]}
          onPress={takeImageFromCamera}
        >
          <MaterialCommunityIcons
            style={{ alignSelf: "center" }}
            name="camera"
            size={30}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: 300,
    // resizeMode: "cover",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#65000B",
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    elevation: 10,
    zIndex: 2,
  },
});

export default ImagePickerComponent;
