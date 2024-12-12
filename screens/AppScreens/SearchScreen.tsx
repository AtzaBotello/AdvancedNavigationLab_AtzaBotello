import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { SearchStackParamList } from "../../navigation/AppNavigation/SearchTabStack/SearchNavigation";
import { useNavigation } from "@react-navigation/native";

type SearchScreenNavigationProps = StackNavigationProp<SearchStackParamList, "DetailsScreen">;

const SearchScreen: React.FC = () => {
  const navigation = useNavigation<SearchScreenNavigationProps>();

  const [query, setQuery] = useState<string>(""); // User input for search
  const [filteredData, setFilteredData] = useState<string[]>([]);

  // Sample data to search from
  const data = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
    "Honeydew",
  ];

  // Filter data based on search query
  const handleSearch = (text: string) => {
    setQuery(text);
    if (text) {
      const newData = data.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(newData);
    } else {
      setFilteredData([]);
    }
  };

  // Render individual list items
  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("DetailsScreen", {itemName: item})}
    >
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={query}
        onChangeText={handleSearch}
      />
      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noResults}>No results found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  searchInput: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  item: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#e6e6e6",
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
  },
  noResults: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#aaa",
  },
});

export default SearchScreen;