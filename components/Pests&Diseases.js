import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import axios from "axios";
import ImagePickerComponent from "./ImageUpload"; // Ensure you have this component implemented

const PestsDiseases = () => {
  const [image, setImage] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);

  const handleImageUpload = (uploadedImage) => {
    setImage(uploadedImage);
    sendImageForDiagnosis(uploadedImage);
  };

  const sendImageForDiagnosis = async (uri) => {
    let formData = new FormData();
    formData.append("images", {
      uri: uri,
      name: "image.jpg",
      type: "image/jpg",
    });
    formData.append("latitude", 49.207);
    formData.append("longitude", 16.608);
    formData.append("similar_images", true);

    try {
      let response = await axios.post(
        "https://crop.kindwise.com/api/v1/identification",
        formData,
        {
          headers: {
            "Api-Key": "HfrpH4432kvEGPXCyWZNVQPNAmfy2bzv43Lda7v1Qbo2Q1Rfbg",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setDiagnosis(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDiagnosedData = async () => {
    try {
      let response = await axios.get(
        `https://crop.kindwise.com/api/v1/identification/${diagnosis.access_token}?details=type,common_names,eppo_code,wiki_url,taxonomy&language=en`,
        {
          headers: {
            "Api-Key": "HfrpH4432kvEGPXCyWZNVQPNAmfy2bzv43Lda7v1Qbo2Q1Rfbg",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDiagnosis = async () => {
    try {
      let response = await axios.delete(
        `https://crop.kindwise.com/api/v1/identification/${diagnosis.access_token}`,
        {
          headers: {
            "Api-Key": "HfrpH4432kvEGPXCyWZNVQPNAmfy2bzv43Lda7v1Qbo2Q1Rfbg",
          },
        }
      );
      console.log(response);
      setDiagnosis(null);
    } catch (error) {
      console.error(error);
    }
  };

  const renderDisease = (disease) => {
    return (
      <View key={disease.name} style={styles.diseaseContainer}>
        <Text style={styles.diseaseName}>{disease.name}</Text>
        <Text style={styles.probability}>
          Probability: {disease.probability}
        </Text>

        <Text style={styles.sectionTitle}>Similar Images</Text>
        {disease.similar_images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: image.url_small }} style={styles.image} />
            <Text>Similarity: {image.similarity}</Text>
            <Text>Citation: {image.citation}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Details</Text>
        <Text>
          Common Names:{" "}
          {disease.details.common_names
            ? disease.details.common_names.join(", ")
            : "N/A"}
        </Text>
        <Text>Type: {disease.details.type}</Text>
        <Text>Scientific Name: {disease.scientific_name}</Text>
        <Text>EPPO Code: {disease.details.eppo_code}</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL(disease.details.wiki_url)}
        >
          <Text style={styles.link}>Wiki URL: {disease.details.wiki_url}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pest And Disease Detector</Text>

      <ImagePickerComponent
        ImgContainer={styles.imgContainer}
        onImageSelected={handleImageUpload}
        btnSyl={styles.imgBtn}
      />
      <Text style={styles.heading}>Diagnosis Result:</Text>

      <ScrollView>
        {image && !diagnosis && (
          <View>
            <Text>Image uploaded successfully, awaiting diagnosis...</Text>
          </View>
        )}
        {diagnosis && (
          <View style={styles.diagnosisContainer}>
            {diagnosis.result.disease.suggestions.map(renderDisease)}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={getDiagnosedData}
              >
                <Text style={styles.buttonText}>Get Diagnosed Data</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={deleteDiagnosis}>
                <Text style={styles.buttonText}>Delete Diagnosis</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
    marginTop: 30,
  },
  diagnosisContainer: {
    alignItems: "center",
    marginTop: 20,
    // backgroundColor: "lightgreen",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  imgContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    // backgroundColor: "lightblue",
  },
  imgBtn: { top: -50, height: 55 },
  diseaseContainer: {
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 8,
    // backgroundColor: "lightblue",
    width: "100%",
    elevation: 8,
  },
  diseaseName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  probability: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  imageContainer: {
    marginBottom: 10,
    width: "100%",
  },
  image: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default PestsDiseases;
