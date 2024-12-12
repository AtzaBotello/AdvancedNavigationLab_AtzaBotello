import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useTheme } from "../context/themeContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FeedStackParamList } from "../navigation/AppNavigation/FeedTabStack/FeedNavigation";

interface CategoryCardCarouselProps {
  product: {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
  };
}
type HomeScreenNavigationProp = StackNavigationProp<FeedStackParamList, "Details">;

const CategoryCardCarousel: React.FC<CategoryCardCarouselProps> = ({ product }) => {
  const { theme } = useTheme();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // Animation shared value
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
    translateY.value = withTiming(0, { duration: 500 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.productCard, animatedStyle]}>
      <TouchableOpacity
        style={[styles.cardContainer, { backgroundColor: theme.card }]}
        onPress={() => navigation.navigate("Details", { id: product.id })}
      >
        <Image source={{ uri: product.thumbnail }} style={styles.productImage} />
        <View style={styles.textContainer}>
          <Text style={[styles.productTitle, { color: theme.text }]} numberOfLines={2}>
            {product.title}
          </Text>
          <Text style={[styles.productPrice, { color: theme.primary }]}>
            ${product.price.toFixed(2)}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: 140,
    marginRight: 16,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  productImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  textContainer: {
    padding: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default React.memo(CategoryCardCarousel);