// navigators/HomeNavigator.tsx

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FeedNavigation from "./FeedTabStack/FeedNavigation";

import DetailsScreen from "../../screens/AppScreens/DetailsScreen"; // Import your Details Screen
import SearchNavigation from "./SearchTabStack/SearchNavigation";

import Icon from "react-native-remix-icon";

import { useTheme } from "../../context/themeContext";

export type HomeTabParamList = {
  Feed: undefined;
  Search: undefined;
  Notifications: undefined;
};

const Tab = createBottomTabNavigator<HomeTabParamList>();

const HomeNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.background, // Theme-based background for the tab bar
        },
        tabBarActiveTintColor: theme.primary, // Theme-based active tab color
        tabBarInactiveTintColor: theme.text, // Theme-based inactive tab color
      })}
    >
      <Tab.Screen
        name="Feed"
        component={FeedNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home-3-fill" size="24" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="search-line" size="24" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={DetailsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="notification-3-fill" size="24" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigator;