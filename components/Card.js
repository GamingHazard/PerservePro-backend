import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Card } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";

const Mycard = ({
  title,
  imgurl,
  cardStyle,
  imgStyle,
  content,
  txtStyle,
  profStyle,
  profilePic,
  heartIcon,
  chatIcon,
  shareIcon,
  ID,
  date,
  commentBtn,
}) => {
  return (
    <Card containerStyle={[styles.card, cardStyle]}>
      <View style={[styles.avatar, profStyle]}>
        <Avatar rounded size="medium" source={profilePic} />
        <Text
          style={{
            marginHorizontal: 20,
            alignSelf: "center",
            // fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {ID}
          {"\n"}
          {date}
        </Text>
      </View>
      <Image style={[styles.img, imgStyle]} source={imgurl} />
      <Card.Divider />
      <Card.Title style={{ fontSize: 20, fontWeight: "bold" }}>
        {title}
      </Card.Title>
      <Text style={[styles.txt, txtStyle]}>{content} </Text>
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-evenly",
          width: "100%",
          height: "auto",
        }}
      >
        <TouchableOpacity>
          <MaterialCommunityIcons name={heartIcon} size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={commentBtn}>
          <MaterialCommunityIcons name={chatIcon} size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name={shareIcon} size={30} color="black" />
        </TouchableOpacity>
        {/* <MaterialCommunityIcons name="eye-outline" size={30} color="black" /> */}
      </View>
    </Card>
  );
};

export default Mycard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 0,
    height: "auto",
    width: 180,
  },
  avatar: {
    padding: 10,
    flexDirection: "row",
    // backgroundColor: "lightgreen",
    bottom: 0,
  },
});
