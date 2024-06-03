import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import Btn from "./Btn";
// import { AuthContext } from "./AuthContext";
import { AuthContext } from "./AuthContext ";
import axios from "axios";
import LoadingScreen from "./LoadingScreen"; // Import the LoadingScreen component
import { TouchableOpacity } from "react-native";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const { login } = useContext(AuthContext);

  const handleSignUp = () => {
    setLoading(true); // Show loading animation

    axios
      .post("http://preservepro-backend.onrender.com/user/signup", {
        email,
        password,
      })
      .then((response) => {
        setLoading(false); // Hide loading animation
        const token = response.data.token;
        login(token); // Store the token using AuthContext
        navigation.navigate("Home"); // Navigate to the Home screen
      })
      .catch((error) => {
        setLoading(false); // Hide loading animation
        const errorMessage =
          error.response?.data?.message ||
          "Error creating account. Please try again.";
        Alert.alert("Sign Up Failed", errorMessage);
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titles}>Sign Up</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Btn btnStyle={styles.btn} btnText={"SIGN UP"} action={handleSignUp} />
      <View style={styles.footer}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signUpText}>Login</Text>
        </TouchableOpacity>
      </View>
      {loading && <LoadingScreen visible={loading} />}
      {/* Show LoadingScreen when loading */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
    width: "100%",
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    width: "100%",
    borderRadius: 8,
  },
  titles: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 10,
  },
  btn: {
    width: "100%",
    padding: 10,
    height: 40,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  signUpText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#65000B",
    marginLeft: 5,
  },
});

export default SignUp;
