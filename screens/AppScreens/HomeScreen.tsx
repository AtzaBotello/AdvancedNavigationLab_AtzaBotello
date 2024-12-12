import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { useFetchCategoryList } from "../../service/ApiService";
import { useTheme } from "../../context/themeContext";
import CategoryCarousel from "../../components/CategoryCarousel";

const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const { data: categories, isLoading: isLoadingCategories } = useFetchCategoryList();
  const [visibleCategories, setVisibleCategories] = useState<Record<string, boolean>>({});

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    const updatedVisibility: Record<string, boolean> = {};
    viewableItems.forEach((item: { key: string }) => {
      updatedVisibility[item.key] = true;
    });
    setVisibleCategories((prev) => ({ ...prev, ...updatedVisibility }));
  }, []);

  if (isLoadingCategories) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator testID="loading-indicator" size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <FlatList
      testID="flatlist"
      data={categories}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <View style={styles.categorySection}>
          <Text style={[styles.categoryTitle, { color: theme.text }]}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Text>
          {visibleCategories[item] && <CategoryCarousel category={item} />}
        </View>
      )}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 50, // Load when at least 50% of the item is visible
      }}
      contentContainerStyle={[styles.contentContainer, { backgroundColor: theme.background }]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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