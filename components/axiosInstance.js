import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
  baseURL: "https://preservepro-backend.onrender.com", // Updated with your IPv4 address
  timeout: 10000, // Optional timeout setting
});

// Request interceptor to handle multipart/form-data and add token
axiosInstance.interceptors.request.use(
  async (config) => {
    // Check if the request data includes a file (image)
    if (config.data instanceof FormData) {
      // If FormData is present, set Content-Type to multipart/form-data
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      // If not FormData, set Content-Type to application/json
      config.headers["Content-Type"] = "application/json";
    }

    // Retrieve the token from AsyncStorage
    const token = await AsyncStorage.getItem("token");
    if (token) {
      // Attach the token to the Authorization header if it exists
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
