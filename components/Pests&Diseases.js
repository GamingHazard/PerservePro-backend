import React, { useState } from "react";
import {
  View,
  Button,
  Image,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const PestsDiseases = () => {
  const [image, setImage] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const diagnosePlant = async () => {
    const API_KEY = "HfrpH4432kvEGPXCyWZNVQPNAmfy2bzv43Lda7v1Qbo2Q1Rfbg"; // Replace with your actual API key
    const ACCESS_TOKEN = "KypIENdUcKEx7RL"; // Replace with the access token received from the image upload
    const API_ENDPOINT = `https://crop.kindwise.com/api/v1/identification/${ACCESS_TOKEN}?details=type,common_names,eppo_code,wiki_url,taxonomy&language=en`;

    try {
      const response = await axios.get(API_ENDPOINT, {
        headers: {
          "Api-Key": API_KEY,
        },
      });

      setDiagnosis(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Diagnose Plant" onPress={diagnosePlant} />
      {diagnosis && (
        <ScrollView style={styles.diagnosisContainer}>
          <Text style={styles.heading}>Diagnosis Results:</Text>
          <Text style={styles.subheading}>
            Is Plant: {diagnosis.is_plant.binary ? "Yes" : "No"}
          </Text>
          {diagnosis.disease && (
            <View>
              <Text style={styles.subheading}>Disease Suggestions:</Text>
              {diagnosis.disease.suggestions.map((suggestion, index) => (
                <View key={index} style={styles.itemContainer}>
                  <Text>Name: {suggestion.name}</Text>
                  <Text>Probability: {suggestion.probability}</Text>
                  {/* You can render more details here */}
                </View>
              ))}
            </View>
          )}
          {diagnosis.crop && (
            <View>
              <Text style={styles.subheading}>Crop Suggestions:</Text>
              {diagnosis.crop.suggestions.map((suggestion, index) => (
                <View key={index} style={styles.itemContainer}>
                  <Text>Name: {suggestion.name}</Text>
                  <Text>Probability: {suggestion.probability}</Text>
                  {/* You can render more details here */}
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    marginBottom: 20,
  },
  diagnosisContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  itemContainer: {
    marginTop: 5,
  },
});

export default PestsDiseases;

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import axios from "axios";
// import ImagePickerComponent from "./ImageUpload";

// const PestsDiseases = () => {
//   const [image, setImage] = useState(null);
//   const [diagnosis, setDiagnosis] = useState(null);

//   const handleImageUpload = (uploadedImage) => {
//     setImage(uploadedImage);
//     sendImageForDiagnosis(uploadedImage);
//   };

//   const sendImageForDiagnosis = async (uri) => {
//     let formData = new FormData();
//     formData.append("images", {
//       uri: uri,
//       name: "image.jpg",
//       type: "image/jpg",
//     });
//     formData.append("latitude", 49.207);
//     formData.append("longitude", 16.608);
//     formData.append("similar_images", true);

//     try {
//       let response = await axios.post(
//         "https://crop.kindwise.com/api/v1/identification",
//         formData,
//         {
//           headers: {
//             "Api-Key": "HfrpH4432kvEGPXCyWZNVQPNAmfy2bzv43Lda7v1Qbo2Q1Rfbg",
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setDiagnosis(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getDiagnosedData = async () => {
//     try {
//       let response = await axios.get(
//         `https://crop.kindwise.com/api/v1/identification/${diagnosis.access_token}?details=type,common_names,eppo_code,wiki_url,taxonomy&language=en`,
//         {
//           headers: {
//             "Api-Key": "HfrpH4432kvEGPXCyWZNVQPNAmfy2bzv43Lda7v1Qbo2Q1Rfbg",
//           },
//         }
//       );
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const deleteDiagnosis = async () => {
//     try {
//       let response = await axios.delete(
//         `https://crop.kindwise.com/api/v1/identification/${diagnosis.access_token}`,
//         {
//           headers: {
//             "Api-Key": "HfrpH4432kvEGPXCyWZNVQPNAmfy2bzv43Lda7v1Qbo2Q1Rfbg",
//           },
//         }
//       );
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <ImagePickerComponent
//         ImgContainer={styles.imgContainer}
//         onImageSelected={handleImageUpload}
//         btnSyl={styles.imgBtn}
//       />
//       {image && !diagnosis && (
//         <Image source={{ uri: image }} style={styles.image} />
//       )}
//       {diagnosis && (
//         <View style={styles.diagnosisContainer}>
//           <Text style={styles.heading}>Diagnosis Result:{data}</Text>
//           <View style={styles.buttonContainer}>
//             <Button
//               title="Get Diagnosed Data"
//               onPress={getDiagnosedData}
//               style={styles.button}
//             />
//             <Button
//               title="Delete Diagnosis"
//               onPress={deleteDiagnosis}
//               style={styles.button}
//             />
//           </View>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f0f0f0",
//     top: 30,
//   },
//   image: {
//     width: 200,
//     height: 200,
//     marginBottom: 20,
//   },
//   diagnosisContainer: {
//     alignItems: "center",
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     width: "100%",
//   },
//   imgContainer: { width: 400 },
//   imgBtn: { width: 60 },
// });

// export default PestsDiseases;
