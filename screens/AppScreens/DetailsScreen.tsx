// screens/DetailsScreen.tsx

import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeTabParamList } from "../../navigation/AppNavigation/HomeNavigator";
import { useTheme } from "../../context/themeContext";
import { useCart } from "../../context/CartContext";

// Define navigation and route types
type DetailsScreenNavigationProp = StackNavigationProp<HomeTabParamList, "Feed">;
type DetailsScreenRouteProp = RouteProp<HomeTabParamList, "Feed">;

const DetailsScreen: React.FC = () => {
  const { theme } = useTheme();
  
  const route = useRoute<DetailsScreenRouteProp>();
  const { itemId, otherParam } = route.params || { itemId: 42, otherParam: "Default Parameter" };

  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image
        source={{ uri: "https://via.placeholder.com/300" }} // Replace with actual product image URL
        style={styles.productImage}
      />
      <View style={styles.detailsContainer}>
        <Text style={[styles.title, { color: theme.text }]}>Stylish Product</Text>
        <Text style={[styles.description, { color: theme.text }]}>A high-quality product that meets your needs.</Text>
        <Text style={[styles.price, { color: theme.primary }]}>$50.00</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={[styles.quantityButton, { backgroundColor: theme.primary }]}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={[styles.quantityText, { color: theme.text }]}>{quantity}</Text>

          <TouchableOpacity
            style={[styles.quantityButton, { backgroundColor: theme.primary }]}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.addToCartButton, { backgroundColor: theme.primary }]}
          onPress={handleAddToCart}
        >
          <Text style={[styles.addToCartButtonText, { color: theme.title }]}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 16,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#ffffff20", // Semi-transparent overlay
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  quantityButtonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 16,
  },
  addToCartButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  addToCartButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DetailsScreen;