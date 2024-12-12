import React from "react";
import { FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useFetchProductsByCategory } from "../service/ApiService";
import CategoryCardCarousel from "./CategoryCardCarousel"; // Import reusable ProductCard component
import { useTheme } from "../context/themeContext";

interface CategoryCarouselProps {
  category: string;
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ category }) => {
  const { theme } = useTheme();
  const { data: products, isLoading } = useFetchProductsByCategory(category);

  if (isLoading) {
    return (
      <ActivityIndicator
        size="small"
        color={theme.primary}
        style={styles.loader}
      />
    );
  }

  return (
    <FlatList
      horizontal
      data={products?.slice(0, 10)} // Limit to 10 products
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <CategoryCardCarousel product={item} />}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    marginVertical: 16,
  },
});

export default CategoryCarousel;