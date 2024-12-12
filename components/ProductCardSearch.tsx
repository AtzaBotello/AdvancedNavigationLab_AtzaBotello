import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../context/themeContext";

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
  };
  onPress: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.productCard, { backgroundColor: theme.card }]}
      onPress={() => onPress(product.id)}
    >
      <Text style={[styles.productTitle, { color: theme.text }]}>{product.title}</Text>
      <Text style={[styles.productPrice, { color: theme.primary }]}>${product.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    marginTop: 4,
  },
});

export default React.memo(ProductCard);