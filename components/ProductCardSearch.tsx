import React from "react";
import { Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useTheme } from "../context/themeContext";
import { SearchStackParamList } from "../navigation/AppNavigation/SearchTabStack/SearchNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
  };
  onPress: (id: number) => void;
}

type SearchScreenNavigationProp = StackNavigationProp<SearchStackParamList, "DetailsScreen">;

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const { theme } = useTheme();

  const navigation = useNavigation<SearchScreenNavigationProp>();

  return (
    <TouchableOpacity
      style={[styles.productCard, { backgroundColor: theme.card }]}
      onPress={() => navigation.navigate("DetailsScreen", { id: product.id })}
    >
      <Image source={{ uri: product.thumbnail }} style={styles.productImage} />
      <Text style={[styles.productTitle, { color: theme.text }]} numberOfLines={1}>
        {product.title}
      </Text>
      <Text style={[styles.productPrice, { color: theme.primary }]}>
        ${product.price.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    searchBarContainer: {
      borderRadius: 24,
      paddingHorizontal: 16,
      marginBottom: 16,
      flexDirection: "row",
      alignItems: "center",
    },
    searchInput: {
      flex: 1,
      height: 48,
      fontSize: 16,
    },
    loader: {
      marginTop: 16,
    },
    errorText: {
      textAlign: "center",
      marginVertical: 16,
      fontSize: 16,
    },
    productCard: {
      flex: 1,
      margin: 8,
      borderRadius: 12,
      padding: 12,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#ccc",
      overflow: "hidden",
    },
    productImage: {
      width: "100%",
      height: 120,
      resizeMode: "cover",
      borderRadius: 8,
    },
    productTitle: {
      fontSize: 14,
      fontWeight: "600",
      marginVertical: 8,
      textAlign: "center",
    },
    productPrice: {
      fontSize: 16,
      fontWeight: "bold",
    },
    listContainer: {
      paddingBottom: 16,
    },
    columnWrapper: {
      justifyContent: "space-between",
    },
    noResultsText: {
      textAlign: "center",
      fontSize: 16,
      marginTop: 16,
    },
  });

export default React.memo(ProductCard);