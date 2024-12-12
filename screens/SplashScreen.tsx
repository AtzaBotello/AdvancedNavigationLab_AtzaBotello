import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from "react-native-reanimated";

const SplashScreen: React.FC = () => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    // Start rotation animation
    rotation.value = withRepeat(withTiming(360, { duration: 2000 }), -1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, animatedStyle]}>
        {/* Use the .webp logo */}
        <Image source={require("../assets/RNLogoApp_transparent.webp")} style={styles.logo} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Adjust for light/dark themes
  },
  logoContainer: {
    width: 150,
    height: 150,
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain", // Ensures proper aspect ratio
  },
});

export default SplashScreen;