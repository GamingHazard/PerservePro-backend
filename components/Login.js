import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
// import { AuthContext } from "./AuthContext";
import { AuthContext } from "./AuthContext ";
import axios from "axios";
import Btn from "./Btn";
import LoadingScreen from "./LoadingScreen";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    setLoading(true); // Show loading animation

    axios
      .post("http://preservepro-backend.onrender.com/user/login", {
        email,
        password,
      })
      .then((response) => {
        setLoading(false); // Hide loading animation
        if (response.status === 200) {
          const token = response.data.token;
          login(token); // Store the token using AuthContext
          navigation.navigate("Home"); // Navigate to the Home screen
        } else {
          Alert.alert("Login Failed", "Invalid email or password.");
        }
      })
      .catch((error) => {
        setLoading(false); // Hide loading animation
        const errorMessage =
          error.response?.data?.message || "Invalid email or password.";
        Alert.alert("Login Failed", errorMessage);
        console.error(error);
      });
  };

  const handleEmailChange = (text) => {
    setEmail(text.toLowerCase());
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titles}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
        style={styles.input}
      />
      <Btn btnStyle={styles.btn} btnText="LOGIN" action={handleLogin} />
      <View style={styles.footer}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      {loading && <LoadingScreen visible={loading} />}{" "}
      {/* Show LoadingScreen when loading */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "white",
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

export default Login;
