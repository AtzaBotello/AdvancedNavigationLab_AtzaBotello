import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../navigation/AuthNavigation/AuthNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "../../navigation/RootNavigation";
import { useCart } from "../../context/CartContext";

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, "Register">;

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const { register, loading, currentUser } = useAuth();
  const { loadUserCart } = useCart();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Animation shared values
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

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const success = await register(email, password);
    if (success) {
      await loadUserCart(currentUser?.userId ?? "");
      Alert.alert("Registration Successful", "You are part of this incredible app.", [
        {
          text: "OK",
        },
      ]);
    } else {
      setErrorMessage("An account with this email already exists.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../../assets/RNLogoApp_transparent.webp")} style={styles.logo} />

      {/* Animated Form */}
      <Animated.View style={[styles.formContainer, animatedStyle]}>
        <Text style={styles.title}>Register</Text>

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

        {/* Confirm Password Input */}
        <TextInput
          style={[styles.input, errorMessage ? styles.inputError : null]}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {/* Error Message */}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        {/* Register Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? "Registering..." : "Register"}</Text>
        </TouchableOpacity>

        {/* Go to Login */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.linkButton}
        >
          <Text style={styles.linkText}>Already have an account? Login</Text>
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
    marginBottom: 16,
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

export default RegisterScreen;