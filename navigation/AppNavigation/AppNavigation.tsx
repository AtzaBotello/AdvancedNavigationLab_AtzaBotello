// navigators/AppNavigator.tsx

import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeNavigator from "./HomeNavigator"; // Import your Bottom Tab Navigator
import ProfileScreen from "../../screens/AppScreens/ProfileScreen"; // Import your Profile Screen
import SettingsScreen from "../../screens/AppScreens/SettingsScreen"; // Import your Settings Screen
import LoginScreen from "../../screens/AuthScreens/LoginScreen";
import { useAuth } from "../RootNavigation";
import { useTheme } from "../../context/themeContext";
import { SafeAreaView } from "react-native";
import { useCart } from "../../context/CartContext";

// Define the type for the Drawer Navigator's routes
export type AppDrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  Logout: undefined;
};

// Create the Drawer Navigator
const Drawer = createDrawerNavigator<AppDrawerParamList>();

const AppNavigator: React.FC = () => {
  const { logout } = useAuth();
  const { logoutUserCart } = useCart();
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: theme.background, // Set drawer background color based on theme
          },
          drawerActiveTintColor: theme.primary, // Active item color
          drawerInactiveTintColor: theme.text, // Inactive item color
          drawerLabelStyle: {
            fontSize: 16,
          },
        }}
      >
        {/* Home Screen (Links to Bottom Tab Navigator) */}
        <Drawer.Screen
          name="Home"
          component={HomeNavigator}
          options={{ title: "Home" }} // Customize title
        />

        {/* Profile Screen */}
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Profile" }}
        />

        {/* Settings Screen */}
        <Drawer.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Settings" }}
        />

        {/* Logout */}
        <Drawer.Screen
          name="Logout"
          component={LoginScreen}
          listeners={{
            drawerItemPress: () => {
              logoutUserCart();
              logout();
            },
          }}
          options={{ title: "Logout" }}
        />
      </Drawer.Navigator>
    </SafeAreaView>
  );
};

export default AppNavigator;