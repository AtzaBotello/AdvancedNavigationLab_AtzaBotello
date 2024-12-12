import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/themeContext";
import CartButton from "./CartButton"; 

interface CustomHeaderProps {
  title: string;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const canGoBack = navigation.canGoBack();
  const goBack = () => navigation.goBack();

  return (
    <View style={[styles.headerContainer, { backgroundColor: theme.primary }]}>
      {/* Conditionally Render Back Button */}
      {canGoBack && (
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text style={[styles.backText, { color: theme.text }]}>←</Text>
        </TouchableOpacity>
      )}

      {/* Title */}
      <Text style={[styles.title, { color: theme.title }]}>{title}</Text>

      {/* Cart Icon */}
      <CartButton />
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
});

export default React.memo(CustomHeader);