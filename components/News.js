import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import axios from "axios";

const LocalNews = () => {
  const [localNewsData, setLocalNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrls = [
    "https://newsdata.io/api/1/latest?country=ug&apikey=pub_4483701abe0a98569de3d05ba7906d966b2a5",
    "https://newsdata.io/api/1/latest?country=ug&category=entertainment&apikey=pub_4483701abe0a98569de3d05ba7906d966b2a5",
    "https://newsdata.io/api/1/latest?country=ug&category=health&apikey=pub_4483701abe0a98569de3d05ba7906d966b2a5",
    "https://newsdata.io/api/1/latest?country=ug&category=technology&apikey=pub_4483701abe0a98569de3d05ba7906d966b2a5",
    "https://newsdata.io/api/1/latest?country=ug&category=business&apikey=pub_4483701abe0a98569de3d05ba7906d966b2a5",
    "https://newsdata.io/api/1/latest?country=ug&category=world&apikey=pub_4483701abe0a98569de3d05ba7906d966b2a5",
    // "https://newsdata.io/api/1/latest?apikey=pub_4483701abe0a98569de3d05ba7906d966b2a5&country=ke",
    // "https://newsdata.io/api/1/latest?apikey=pub_4483701abe0a98569de3d05ba7906d966b2a5&country=tz",
    // "https://newsdata.io/api/1/latest?apikey=pub_4483701abe0a98569de3d05ba7906d966b2a5&country=rw",
  ];

  useEffect(() => {
    fetchLocalNews();
  }, []);

  const fetchLocalNews = async () => {
    try {
      const allNewsData = [];
      for (let i = 0; i < apiUrls.length; i++) {
        const response = await axios.get(apiUrls[i]);
        const newsData = (response.data.results || []).map((item) => ({
          ...item,
          key: `${item.article_id || item.link}_${i}`, // Use a unique key including index
        }));
        allNewsData.push(...newsData);
      }
      setLocalNewsData(allNewsData);
    } catch (error) {
      console.error("Error fetching local news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePress = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Error opening URL:", err)
    );
  };

  const truncateText = (text, length) => {
    if (!text) return "";
    if (text.length <= length) {
      return text;
    }
    return text.slice(0, length) + "...";
  };

  const renderLocalNewsItem = (item) => (
    <TouchableOpacity key={item.key} onPress={() => handlePress(item.link)}>
      <View style={styles.localNewsItem}>
        {item.image_url ? (
          <Image
            source={{ uri: item.image_url }}
            style={styles.localNewsImage}
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text>No Image</Text>
          </View>
        )}
        <View style={styles.localNewsText}>
          <Text style={styles.localNewsTitle}>{item.title}</Text>
          <Text>{truncateText(item.description, 100)}</Text>
          <TouchableOpacity onPress={() => handlePress(item.link)}>
            <Text style={styles.readMore}>Read More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!localNewsData || localNewsData.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text>No news available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {localNewsData.map(renderLocalNewsItem)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  localNewsItem: {
    flexDirection: "row",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  localNewsImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  placeholderImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  localNewsText: {
    flex: 1,
  },
  localNewsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  readMore: {
    color: "blue",
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LocalNews;
