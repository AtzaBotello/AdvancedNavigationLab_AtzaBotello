// screens/HomeScreen.tsx

import React from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeTabParamList } from "../../navigation/AppNavigation/HomeNavigator";
import { useTheme } from "../../context/themeContext";

type HomeScreenNavigationProp = StackNavigationProp<HomeTabParamList, "Feed">;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { theme } = useTheme();

  return (
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <Text style={[styles.title, { color: theme.text }]}>Home Screen</Text>
        <Button
          title="Go to Details"
          color={theme.primary}
          onPress={() => navigation.navigate("Notifications")}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default HomeScreen;