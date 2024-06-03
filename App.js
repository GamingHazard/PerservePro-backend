import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AuthProvider } from "./components/AuthContext ";

import screens from "./components/Screen";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
// Create stack and tab navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth stack for login and signup
const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{ headerShown: false }}
      name="Login"
      component={Login}
    />
    <Stack.Screen name="SignUp" component={SignUp} />
    {screens.map((screen) => (
      <Stack.Screen
        key={screen.name}
        name={screen.name}
        component={screen.component}
        options={{ headerShown: false, ...(screen.options || {}) }}
      />
    ))}
  </Stack.Navigator>
);

// Main App component with navigation container
const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen
            name="Auth"
            component={AuthStack}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
