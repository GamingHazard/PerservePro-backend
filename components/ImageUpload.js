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

  const pickImage = async () => {
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

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      if (onImageSelected) {
        onImageSelected(result.assets[0].uri);
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
      <View style={[styles.addBtn, btnSyl]}>
        <TouchableOpacity onPress={pickImage}>
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
  addBtn: {
    backgroundColor: "#65000B",
    height: 60,
    width: "15%",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 50,
    top: -30,
    alignSelf: "flex-end",
    marginHorizontal: 20,
    elevation: 10,
    zIndex: 2,
  },
});

export default ImagePickerComponent;

// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Image,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

// const ImagePickerComponent = ({
//   aspectRatio,
//   quality,
//   onImageSelected,
//   btnSyl,
//   ImgContainer,
//   imgStyl,
// }) => {
//   const [image, setImage] = useState(null);
//   const [hasPermission, setHasPermission] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const mediaPermission =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (!mediaPermission.granted) {
//         Alert.alert(
//           "Permission required",
//           "Please grant access to your media library to use this feature."
//         );
//         return;
//       }
//       setHasPermission(true);
//     })();
//   }, []);

//   const pickImage = async () => {
//     if (hasPermission === false) {
//       Alert.alert(
//         "Permission denied",
//         "You need to grant media library permissions to use this feature."
//       );
//       return;
//     }

//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: aspectRatio || [4, 3], // Default aspect ratio
//       quality: quality || 1, // Default quality
//     });

//     if (result.cancelled) {
//       // If user cancels, do nothing
//       return;
//     }

//     setImage(result.uri);
//     if (onImageSelected) {
//       onImageSelected(result.uri);
//     }
//   };

//   return (
//     <View>
//       <View style={[styles.container, ImgContainer]}>
//         {image && (
//           <Image source={{ uri: image }} style={[styles.image, imgStyl]} />
//         )}
//       </View>
//       <View style={[styles.addBtn, btnSyl]}>
//         <TouchableOpacity onPress={pickImage}>
//           <MaterialCommunityIcons
//             style={{ alignSelf: "center" }}
//             name="camera"
//             size={30}
//             color="white"
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "whitesmoke",
//     height: 300,
//     top: 20,
//     // resizeMode: "cover",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//   },
//   addBtn: {
//     backgroundColor: "#65000B",
//     height: 60,
//     width: "15%",
//     justifyContent: "center",
//     alignContent: "center",
//     borderRadius: 50,
//     top: -10,
//     alignSelf: "flex-end",
//     marginHorizontal: 20,
//     elevation: 10,
//     zIndex: 2,
//   },
// });

// export default ImagePickerComponent;
