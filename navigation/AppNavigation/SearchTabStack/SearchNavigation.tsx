import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../../../screens/AppScreens/SearchScreen";
import DetailsScreen from "../../../screens/AppScreens/DetailsScreen";
import CustomHeader from "../../../components/CustomHeader";
import { useTheme } from "../../../context/themeContext";

export type SearchStackParamList = {
    SearchScreen: undefined;
    DetailsScreen: { itemName: string };
};

const Stack = createStackNavigator<SearchStackParamList>();

const SearchNavigation: React.FC = () => {
    const { theme } = useTheme();

    return (
        <Stack.Navigator
            initialRouteName="SearchScreen"
            screenOptions={{
                header: ({ route }) => <CustomHeader title={route.name} />, // Custom Header with dynamic title
                headerStyle: {
                  backgroundColor: theme.primary, // Theme-based header background
                },
                headerTintColor: theme.title, // Theme-based header text color
              }}
        >
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        </Stack.Navigator>
    )
}

export default SearchNavigation;