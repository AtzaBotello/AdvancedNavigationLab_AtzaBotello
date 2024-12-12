import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/themeContext";

interface CustomHeaderProps {
  title: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title }) => {
    const navigation = useNavigation();
    const { theme } = useTheme();
  
    return (
      <View style={[styles.headerContainer, { backgroundColor: theme.primary }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, { color: theme.text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.title }]}>{title}</Text>
        <View style={styles.placeholder} /> {/* Placeholder for layout consistency */}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    headerContainer: {
      height: 60,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
    },
    backButton: {
      width: 40,
      justifyContent: "center",
    },
    backText: {
      fontSize: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
    },
    placeholder: {
      width: 40, // Matches the back button width
    },
  });

export default CustomHeader;