import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeTabParamList } from "../../navigation/AppNavigation/HomeNavigator";
import { useTheme } from "../../context/themeContext";
import { useCart } from "../../context/CartContext";
import { useFetchProductById } from "../../service/ApiService";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useAnimation } from "../../context/AnimationContext";
import CardCarouselItem from "../../components/CardCarouselItem";

const { width: screenWidth } = Dimensions.get("window");

// Define navigation and route types
type DetailsScreenRouteProp = RouteProp<HomeTabParamList, "Feed">;

const DetailsScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute<DetailsScreenRouteProp>();
  const { id } = route.params || { id: 0 };

  const { data: product, isLoading, isError } = useFetchProductById(id);
  const { addToCart } = useCart();
  const { isAnimationEnabled } = useAnimation();

  const [quantity, setQuantity] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0); // Tracks the active image index

  // Animation values
  const fadeValue = useSharedValue(isAnimationEnabled ? 0 : 1);

  useEffect(() => {
    if (isAnimationEnabled) {
      fadeValue.value = withTiming(1, { duration: 800 });
    }
  }, [isAnimationEnabled]);

  const fadeInStyle = useAnimatedStyle(() => ({
    opacity: fadeValue.value,
  }));

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
    }
  };

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / (screenWidth * 0.8));
    setActiveIndex(index);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (isError || !product) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.error }]}>
          Failed to load product details. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Horizontal ScrollView for Images */}
      <View>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.carouselContainer}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {product.images.map((image, index) => (
            <CardCarouselItem image={image} key={index}/>
          ))}
        </ScrollView>
        {/* Dot Indicators */}
        <View style={styles.indicatorContainer}>
          {product.images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                activeIndex === index ? { backgroundColor: theme.primary } : { backgroundColor: "#ccc" },
              ]}
            />
          ))}
        </View>
      </View>

      <Animated.View style={[styles.detailsContainer, fadeInStyle]}>
        {/* Product Title */}
        <Text style={[styles.title, { color: theme.text }]}>{product.title}</Text>

        {/* Product Description */}
        <Text style={[styles.description, { color: theme.text }]}>{product.description}</Text>

        {/* Product Price */}
        <Text style={[styles.price, { color: theme.primary }]}>
          ${product.price.toFixed(2)}
        </Text>

        {/* Quantity Selector */}
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={[styles.quantityButton, { backgroundColor: theme.primary }]}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={[styles.quantityText, { color: theme.text }]}>{quantity}</Text>
          <TouchableOpacity
            style={[styles.quantityButton, { backgroundColor: theme.primary }]}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity
          style={[styles.addToCartButton, { backgroundColor: theme.primary }]}
          onPress={handleAddToCart}
        >
          <Text style={[styles.addToCartButtonText, { color: theme.title }]}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  carouselContainer: {
    height: 250, // Reduced height for smaller images
    marginBottom: 8,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: "#ffffff20", // Semi-transparent overlay
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  quantityButtonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 16,
  },
  addToCartButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  addToCartButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default DetailsScreen;