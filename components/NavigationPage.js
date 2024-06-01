import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import screens from "./Screen";
import { AuthContext } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

const Stack = createNativeStackNavigator();

const NavigatorPage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? "Home" : "Login"}>
        {screens.map((screen) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={
              screen.protected
                ? (props) => (
                    <ProtectedRoute component={screen.component} {...props} />
                  )
                : screen.component
            }
            options={{ headerShown: false }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigatorPage;
