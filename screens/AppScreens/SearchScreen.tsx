import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { debounce } from "lodash";
import { useSearchProducts } from "../../service/ApiService";
import { useTheme } from "../../context/themeContext";
import { useNavigation } from "@react-navigation/native";
import { SearchStackParamList } from "../../navigation/AppNavigation/SearchTabStack/SearchNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import ProductCardSearch from "../../components/ProductCardSearch";

type SearchScreenNavigationProp = StackNavigationProp<SearchStackParamList, "DetailsScreen">;


const SearchScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const [query, setQuery] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: products, isLoading, isError } = useSearchProducts(searchTerm);

  // Debounce the search input
  const debounceSearch = useCallback(
    debounce((text: string) => {
      if (text.length >= 3) {
        setSearchTerm(text);
      }
    }, 500),
    []
  );

  const handleInputChange = (text: string) => {
    setQuery(text);
    debounceSearch(text);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Search Bar */}
      <View style={[styles.searchBarContainer, { backgroundColor: theme.card }]}>
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search for products..."
          placeholderTextColor={theme.placeholder}
          value={query}
          onChangeText={handleInputChange}
        />
      </View>

      {/* Content */}
      {isLoading && (
        <ActivityIndicator size="large" color={theme.primary} style={styles.loader} />
      )}
      {isError && (
        <Text style={[styles.errorText, { color: theme.error }]}>
          Something went wrong. Please try again.
        </Text>
      )}
      {!isLoading && !isError && products?.length > 0 && (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <ProductCardSearch product={item} onPress={navigation.navigate} />}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
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

export default SearchScreen;
