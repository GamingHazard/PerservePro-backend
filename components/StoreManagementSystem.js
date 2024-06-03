import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Table, Row, Rows } from "react-native-table-component";
import { LineChart, PieChart } from "expo-chart-kit";
import * as ImagePicker from "expo-image-picker";

const API_URL = "https://your-api-url.com"; // Replace with your actual API URL

const StoreManagement = () => {
  const { control, handleSubmit, reset } = useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/products`);
      setData(response.data || []);
    } catch (error) {
      console.error(error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
    }
  };

  const onSubmit = async (formData) => {
    const form = new FormData();

    for (const key in formData) {
      form.append(key, formData[key]);
    }

    if (image) {
      const uriParts = image.split(".");
      const fileType = uriParts[uriParts.length - 1];

      form.append("image", {
        uri: image,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    try {
      await axios.post(`${API_URL}/products`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchData();
      reset();
      setImage(null);
      setFormVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const tableData = (data || []).map((item) => [
    item.productName,
    item.category,
    item.price,
    item.stockQuantity,
    item.supplier,
    item.dateAdded,
    item.salesQuantity,
    item.expiryDate,
    item.rating,
  ]);

  const chartData = {
    labels: (data || []).map((item) => item.productName),
    datasets: [{ data: (data || []).map((item) => item.salesQuantity) }],
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Store Management System
      </Text>

      <TouchableOpacity onPress={() => setFormVisible(!formVisible)}>
        <Text style={{ color: "blue", marginBottom: 10 }}>
          {formVisible ? "Hide Form" : "Add Product"}
        </Text>
      </TouchableOpacity>

      {formVisible && (
        <View>
          {[
            "productID",
            "productName",
            "category",
            "price",
            "stockQuantity",
            "supplier",
            "dateAdded",
            "salesQuantity",
            "expiryDate",
            "rating",
          ].map((field) => (
            <Controller
              key={field}
              control={control}
              name={field}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder={field}
                  value={value}
                  onChangeText={onChange}
                  style={{
                    marginBottom: 10,
                    padding: 8,
                    borderWidth: 1,
                    borderColor: "#ccc",
                  }}
                />
              )}
            />
          ))}
          <Button title="Pick an image" onPress={pickImage} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100, marginVertical: 10 }}
            />
          )}
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      )}

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <Text style={{ fontSize: 18, marginVertical: 20 }}>Product Data</Text>
          {data.length > 0 ? (
            <ScrollView horizontal>
              <View>
                <Table borderStyle={{ borderWidth: 1 }}>
                  <Row
                    data={[
                      "Product Name",
                      "Category",
                      "Price",
                      "Stock",
                      "Supplier",
                      "Date Added",
                      "Sales",
                      "Expiry Date",
                      "Rating",
                    ]}
                    style={{ height: 40, backgroundColor: "#f1f8ff" }}
                    textStyle={{ margin: 6 }}
                  />
                  <Rows data={tableData} textStyle={{ margin: 6 }} />
                </Table>
              </View>
            </ScrollView>
          ) : (
            <Text>No data available</Text>
          )}

          {data.length > 0 && (
            <>
              <Text style={{ fontSize: 18, marginVertical: 20 }}>
                Sales Quantity Chart
              </Text>
              <LineChart
                data={chartData}
                width={500}
                height={300}
                chartConfig={{
                  backgroundGradientFrom: "#1E2923",
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientTo: "#08130D",
                  backgroundGradientToOpacity: 0.5,
                  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                  strokeWidth: 2,
                  barPercentage: 0.5,
                }}
                bezier
              />

              <Text style={{ fontSize: 18, marginVertical: 20 }}>
                Sales Distribution Pie Chart
              </Text>
              <PieChart
                data={data.map((item) => ({
                  name: item.productName,
                  population: item.salesQuantity,
                  color: `rgba(131, 167, 234, 1)`,
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
                }))}
                width={500}
                height={300}
                chartConfig={{
                  backgroundGradientFrom: "#1E2923",
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientTo: "#08130D",
                  backgroundGradientToOpacity: 0.5,
                  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                  strokeWidth: 2,
                  barPercentage: 0.5,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
              />
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default StoreManagement;
