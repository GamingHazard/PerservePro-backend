// Community.js
import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axiosInstance from "./axiosInstance";
import Mycard from "./Card";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "./AuthContext ";
import CommentSection from "./CommentSection";

const Community = () => {
  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [posts, setPosts] = useState([]);

  const toggleDrawer = () => {
    setDrawerVisible(!isDrawerVisible);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        "http://preservepro-backend.onrender.com/posts"
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {posts.map((item, index) => (
          <Mycard
            key={index}
            content={item.content}
            imgurl={item.imgurl}
            txtStyle={styles.txt}
            cardStyle={styles.card}
            imgStyle={styles.image}
            profilePic={userInfo.profileImage} // use profile image from context
            ID={item.ID}
            date={item.date}
            heartIcon={item.heartIcon}
            chatIcon={item.chatIcon}
            shareIcon={item.shareIcon}
            commentBtn={toggleDrawer}
            userEmail={userInfo.email} // use email from context
          />
        ))}
        <View style={styles.footer} />
      </ScrollView>
      <CommentSection
        toggleDrawer={toggleDrawer}
        showComment={isDrawerVisible}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("CreatePost")}
        style={styles.addBtn}
      >
        <MaterialCommunityIcons
          style={styles.addIcon}
          name="plus"
          size={30}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 25 },
  scrollView: { backgroundColor: "lightgrey", flexGrow: 1 },
  txt: {
    fontSize: 14,
    marginHorizontal: 10,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginTop: -50,
  },
  card: { width: "93%", marginVertical: 10, elevation: 8 },
  image: { marginTop: -5, height: 270, width: "100%" },
  addBtn: {
    position: "absolute",
    backgroundColor: "#65000B",
    height: 55,
    width: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 27.5,
    right: 20,
    bottom: 40,
    elevation: 10,
  },
  footer: { width: "100%", height: 70 },
});

export default Community;
