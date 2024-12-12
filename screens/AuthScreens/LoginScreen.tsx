import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../navigation/AuthNavigation/AuthNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "../../navigation/RootNavigation";

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, "Login">;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Shared value for animation
  const fadeValue = useSharedValue(0);
  const translateYValue = useSharedValue(50);

  useEffect(() => {
    fadeValue.value = withTiming(1, { duration: 800 });
    translateYValue.value = withTiming(0, { duration: 800 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeValue.value,
    transform: [{ translateY: translateYValue.value }],
  }));

  const handleLogin = async () => {
    const success = await login(email, password);
    if (!success) {
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../../assets/RNLogoApp_transparent.webp")} style={styles.logo} />

      {/* Animated Form */}
      <Animated.View style={[styles.formContainer, animatedStyle]}>
        <Text style={styles.title}>Login</Text>

        {/* Email Input */}
        <TextInput
          style={[styles.input, errorMessage ? styles.inputError : null]}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input */}
        <TextInput
          style={[styles.input, errorMessage ? styles.inputError : null]}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Error Message */}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        {/* Login Button */}
        <TouchableOpacity testID="test-loginButton" style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Go to Register */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={styles.linkButton}
        >
          <Text style={styles.linkText}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 32,
    resizeMode: "contain",
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#FF6B6B",
  },
  errorText: {
    color: "#FF6B6B",
    marginBottom: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#6200EE",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkButton: {
    marginTop: 16,
  },
  linkText: {
    color: "#6200EE",
    fontSize: 16,
  },
});

export default LoginScreen;