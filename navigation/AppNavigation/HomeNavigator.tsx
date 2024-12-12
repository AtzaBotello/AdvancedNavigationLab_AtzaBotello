// navigators/HomeNavigator.tsx

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FeedNavigation from "./FeedTabStack/FeedNavigation";

import DetailsScreen from "../../screens/AppScreens/DetailsScreen"; // Import your Details Screen
import SearchNavigation from "./SearchTabStack/SearchNavigation";
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
      <Tab.Screen name="Feed" component={FeedNavigation} />
      <Tab.Screen name="Search" component={SearchNavigation} />
      <Tab.Screen name="Notifications" component={DetailsScreen} />
    </Tab.Navigator>
  );
};

export default HomeNavigator;