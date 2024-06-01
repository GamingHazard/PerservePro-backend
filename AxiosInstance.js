import axios from "axios";

const backendUrl = "https://preservepro-backend.onrender.com"; // Replace with your Render backend URL

const axiosInstance = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
