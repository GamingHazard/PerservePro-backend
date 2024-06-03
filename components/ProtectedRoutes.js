import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { View, ActivityIndicator } from "react-native";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    // Show a loading indicator while checking auth status
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    // Redirect to login if not authenticated
    navigation.navigate("Login")
  );
};

export default ProtectedRoute;
