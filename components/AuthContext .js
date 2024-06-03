import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        axiosInstance.defaults.headers.Authorization = `Bearer ${storedToken}`;
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    loadToken();
  }, []);

  const login = async (newToken) => {
    setToken(newToken);
    await AsyncStorage.setItem("token", newToken);
    axiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`;
    setIsAuthenticated(true);
  };

  const logout = async () => {
    setToken(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
