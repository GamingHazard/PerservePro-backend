// CommentSection.js
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { AuthContext } from "./AuthContext ";
import axiosInstance from "./axiosInstance";
import Inputs from "./Inputs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CommentCards from "./CommentCards";
const CommentSection = ({ toggleDrawer, showComment, postId }) => {
  const [text, setText] = useState("");
  const { userToken, userInfo } = useContext(AuthContext);

  const handleCommentSubmit = async () => {
    if (!userToken) {
      Alert.alert("Error", "You must be logged in to comment");
      return;
    }

    if (text.trim() === "") {
      Alert.alert("Error", "Please enter a comment");
      return;
    }

    try {
      await axiosInstance.post(
        `/posts/${postId}/comments`,
        { content: text },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      setText("");
      toggleDrawer();
    } catch (error) {
      console.error("Error posting comment:", error);
      Alert.alert("Error", "Failed to post comment. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showComment}
        onRequestClose={toggleDrawer}
      >
        <View style={styles.modalContainer}>
          <View style={styles.commentContainer}>
            <ScrollView style={styles.scrollView}>
              <CommentCards />
              <CommentCards />
              <CommentCards />
              <CommentCards />
            </ScrollView>
          </View>

          <View style={styles.inputContainer}>
            <Inputs
              inputStyle={styles.input}
              multiline={true}
              numberOfLines={4}
              value={text}
              onChangeText={setText}
              placeholder="Add Comment..."
            />
            <View style={styles.sendButtonContainer}>
              <TouchableOpacity onPress={handleCommentSubmit}>
                <MaterialCommunityIcons
                  style={styles.sendIcon}
                  name="send"
                  size={30}
                  color="#65000B"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  modalContainer: {
    flex: 1,
    backgroundColor: "whitesmoke",
    marginTop: 20,
    borderRadius: 8,
    elevation: 8,
  },
  commentContainer: {
    backgroundColor: "whitesmoke",
    height: 720,
    width: "100%",
    padding: 10,
  },
  scrollView: { marginTop: -7 },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    backgroundColor: "white",
  },
  input: { width: "80%" },
  sendButtonContainer: {
    width: "15%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  sendIcon: { marginBottom: 2 },
});

export default CommentSection;
