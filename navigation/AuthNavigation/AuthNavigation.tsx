import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../screens/AuthScreens/LoginScreen"; // Import your Login Screen
import RegisterScreen from "../../screens/AuthScreens/RegisterScreen"; // Import your Register Screen

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;