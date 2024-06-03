import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Help = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const selectImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: "photo",
      },
      (response) => {
        if (response.uri) {
          setImage(response);
        }
      }
    );
  };

  const handleSubmit = () => {
    if (description.trim() === "") {
      Alert.alert("Error", "Please enter a description");
      return;
    }
    // Handle submission logic here, you can post the description and image
    // to your server or perform any other action you want.
    // Example: You can console log the description and image URI for now.
    console.log("Description:", description);
    console.log("Image URI:", image.uri);
  };

  return (
    <View style={styles.container}>
      <Text>
        This is the customer help service, Please leave a message in the field
        below for assisatnce. We shall get to you shortly
      </Text>
      <View
        style={{
          padding: 10,
          height: "auto",
          backgroundColor: "white",
          elevation: 8,
          marginVertical: 20,
          marginTop: 10,
        }}
      >
        <TextInput
          placeholder="Enter description"
          multiline={true}
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <TouchableOpacity
        style={{
          width: "30%",
          height: 50,
          elevation: 8,
          backgroundColor: "#65000B",
          padding: 5,
          justifyContent: "space-evenly",
          borderRadius: 8,
          alignItems: "center",
          alignSelf: "center",
        }}
        onPress={handleSubmit}
      >
        <View>
          <Text style={{ color: "white", fontSize: 16 }}>Send</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "lightgrey",
    paddingTop: 30,
    top: 20,
  },
  addBtn: {
    backgroundColor: "#65000B",
    height: 55,
    width: "15%",
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 20,
    borderRadius: 55,
    elevation: 10,
    alignSelf: "center",
  },
  backImage: {
    justifyContent: "center",
    width: "100%",
    borderRadius: 8,
    height: 250,
    backgroundColor: "white",
    elevation: 8,
  },
});
