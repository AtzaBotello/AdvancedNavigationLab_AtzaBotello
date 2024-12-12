import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import RemixIcon from "react-native-remix-icon"; // Import Remix Icon
import { useCart } from "../context/CartContext"; // Import Cart Context
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/themeContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { FeedStackParamList } from "../navigation/AppNavigation/FeedTabStack/FeedNavigation";

type HomeScreenNavigationProp = StackNavigationProp<FeedStackParamList, "Cart">;

const CartButton: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  
  const { cart } = useCart();
  const { theme } = useTheme();

  const navigateToCart = () => {
    navigation.navigate("Cart");
  }

  return (
    <TouchableOpacity
      style={styles.cartButton}
      onPress={navigateToCart}
    >
      <RemixIcon
        name="shopping-cart-line"
        size={24}
        color={theme.text}
      />
      {cart.length > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cart.length}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default React.memo(CartButton);