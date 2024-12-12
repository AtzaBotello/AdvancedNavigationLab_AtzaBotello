import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../../screens/AppScreens/HomeScreen";
import DetailsScreen from "../../../screens/AppScreens/DetailsScreen";
import CustomHeader from "../../../components/CustomHeader";
import { useTheme } from "../../../context/themeContext";
import CartScreen from "../../../screens/AppScreens/CartScreen";

export type FeedStackParamList = {
    Home: undefined;
    Details: { id: number };
    Cart: undefined;
};

const Stack = createStackNavigator<FeedStackParamList>();

const FeedNavigation: React.FC = () => {
    const { theme } = useTheme();
  
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: ({ route }) => <CustomHeader title={route.name ?? ""} />, // Custom Header with dynamic title
          headerStyle: {
            backgroundColor: theme.primary, // Theme-based header background
          },
          headerTintColor: theme.title, // Theme-based header text color
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    );
  };

export default FeedNavigation;