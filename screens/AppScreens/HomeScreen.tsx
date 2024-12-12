import React from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { useFetchCategoryList } from "../../service/ApiService";
import { useTheme } from "../../context/themeContext";
import CategoryCarousel from "../../components/CategoryCarousel"; // Import reusable component

const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const { data: categories, isLoading: isLoadingCategories } = useFetchCategoryList();

  if (isLoadingCategories) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {categories?.map((category: string) => (
        <View key={category} style={styles.categorySection}>
          <Text style={[styles.categoryTitle, { color: theme.text }]}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Text>
          <CategoryCarousel category={category} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default HomeScreen;