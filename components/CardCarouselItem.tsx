import { Dimensions, Image, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useAnimation } from "../context/AnimationContext";
import { useEffect } from "react";
import React from "react";


const { width: screenWidth } = Dimensions.get("window");

const CardCarouselItem = ({ image }: { image: string }) => {
  const { isAnimationEnabled } = useAnimation();

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

  return (
    <Animated.View style={fadeInStyle}>
      <Image source={{ uri: image }} style={styles.carouselImage} />
    </Animated.View>
  )
};

const styles = StyleSheet.create({
    carouselImage: {
      width: screenWidth * 0.9, // Reduced width for smaller images
      height: 250,
      resizeMode: "contain",
      borderRadius: 8,
      alignSelf: "center",
    },
  });

export default React.memo(CardCarouselItem);