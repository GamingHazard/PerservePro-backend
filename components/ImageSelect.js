import React, { useState } from "react";
import { Button, Image, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ImagePickerComponent = ({
  buttonTitle = "Pick an image",
  onImagePicked,
  style = {},
  imageStyle = {},
  allowsEditing = true,
  aspect = [4, 3],
  quality = 1,
  mediaTypes = ImagePicker.MediaTypeOptions.All,
}) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes,
      allowsEditing,
      aspect,
      quality,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      if (onImagePicked) {
        onImagePicked(uri);
      }
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Button title={buttonTitle} onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={[styles.image, imageStyle]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  image: {
    width: "100%",
    height: 300,
  },
});

export default ImagePickerComponent;
