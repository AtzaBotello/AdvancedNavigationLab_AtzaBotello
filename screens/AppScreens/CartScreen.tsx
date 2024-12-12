import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/themeContext";

const CartScreen: React.FC = () => {
  const { cart, clearCart, getTotal } = useCart();
  const { theme } = useTheme();

  // Map cart data to match expected FlatList structure
  const cartData = cart.map((item) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    quantity: item.quantity,
    thumbnail: item.thumbnail,
  }));

  // Render individual cart items
  const renderItem = ({ item }: { item: { id: number; title: string; price: number; quantity: number; thumbnail: string } }) => (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
        <Text style={[styles.text, { color: theme.text }]}>Quantity: {item.quantity}</Text>
        <Text style={[styles.text, { color: theme.primary }]}>Price: ${(item.price * item.quantity).toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {cart.length > 0 ? (
        <>
          <FlatList
            data={cartData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />
          <View style={styles.totalContainer}>
            <Text style={[styles.totalText, { color: theme.text }]}>Total: ${getTotal().toFixed(2)}</Text>
            <TouchableOpacity
              style={[styles.clearButton, { backgroundColor: theme.primary }]}
              onPress={clearCart}
            >
              <Text style={[styles.clearButtonText, { color: theme.title }]}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={[styles.emptyCartText, { color: theme.text }]}>Your cart is empty!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: "row",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
  },
  totalContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  clearButton: {
    padding: 12,
    borderRadius: 8,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  emptyCartText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
});

export default CartScreen;