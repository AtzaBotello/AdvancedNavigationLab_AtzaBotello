import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeTabParamList } from "../../navigation/AppNavigation/HomeNavigator";
import { useTheme } from "../../context/themeContext";
import { useSearchProducts } from "../../service/ApiService";
import { SearchStackParamList } from "../../navigation/AppNavigation/SearchTabStack/SearchNavigation";
import { debounce } from "lodash";
import ProductCard from "../../components/ProductCardSearch";

type SearchScreenNavigationProp = StackNavigationProp<SearchStackParamList, "DetailsScreen">;

const SearchScreen: React.FC = () => {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const { theme } = useTheme();

  const [query, setQuery] = useState<string>(""); // User's input
  const [searchTerm, setSearchTerm] = useState<string>(""); // Debounced search term
  const { data: products, isLoading, isError } = useSearchProducts(searchTerm);

  // Debounce the input so the API is only called when the user stops typing
  const debounceSearch = useCallback(
    debounce((text: string) => {
      if (text.length >= 3) {
        setSearchTerm(text); // Update the debounced search term
      }
    }, 500), // Adjust debounce delay as needed (in milliseconds)
    []
  );

  const handleInputChange = (text: string) => {
    setQuery(text);
    debounceSearch(text);
  };

  const handleProductPress = (id: number) => {
    navigation.navigate("DetailsScreen", { id });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Search Input */}
      <TextInput
        style={[styles.searchInput, { backgroundColor: theme.card, color: theme.text }]}
        placeholder="Search for products..."
        placeholderTextColor={theme.placeholder}
        value={query}
        onChangeText={handleInputChange}
      />

      {/* Loading Indicator */}
      {isLoading && (
        <ActivityIndicator size="large" color={theme.primary} style={styles.loader} />
      )}

      {/* Error Message */}
      {isError && (
        <Text style={[styles.errorText, { color: theme.error }]}>
          Something went wrong. Please try again.
        </Text>
      )}

      {/* Product List */}
      {!isLoading && !isError && products?.length > 0 && (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard product={item} onPress={handleProductPress} />
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* No Results */}
      {!isLoading && !isError && products?.length === 0 && query.length >= 3 && (
        <Text style={[styles.noResultsText, { color: theme.text }]}>No results found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  loader: {
    marginVertical: 16,
  },
  errorText: {
    textAlign: "center",
    marginVertical: 16,
    fontSize: 16,
  },
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
  listContainer: {
    paddingBottom: 16,
  },
  noResultsText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 16,
  },
});

export default SearchScreen;