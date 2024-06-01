import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-elements";

const CommentCards = () => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={{ flexDirection: "row" }}>
        <Avatar rounded size="small" source={require("../assets/avatar.jpg")} />
        <Text style={{ top: 7, fontWeight: "bold" }}>
          kisibojonathan150@gmail.com
        </Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
          metus id enim sagittis ultrices. In vel tortor nec elit convallis
          tristique at eget dui. Donec eu convallis velit. Ut ullamcorper turpis
          at nisi rhoncus, at sodales justo tempus. Sed bibendum hendrerit
          consectetur. Donec sed justo sapien. Suspendisse potenti. Vestibulum
          ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae; Sed interdum risus non enim viverra, nec ultricies dui
          condimentum. Integer pharetra nisl vitae arcu condimentum, a molestie
          odio eleifend. Aliquam id tellus ut purus rhoncus auctor. Duis nec
          ante sed neque lobortis consectetur. Curabitur sit amet dolor risus.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Quisque vitae sodales lectus. Sed efficitur
          augue a elit tincidunt, et hendrerit justo convallis. Vivamus sagittis
          arcu non purus tristique, vel suscipit elit gravida. Duis volutpat
          purus quis dui lobo
        </Text>
      </View>
    </View>
  );
};

export default CommentCards;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: "auto",
    backgroundColor: "white",
    elevation: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  content: { width: "100%", height: "auto", padding: 10 },
});
