import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "../../navigation/RootNavigation"; // Import Auth Context
import { useTheme } from "../../context/themeContext"; // Import Theme Context

const ProfileScreen: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { theme } = useTheme();

  const handleLogout = async () => {
    await logout();
  };

  if (!currentUser) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.error }]}>
          No user information available.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Profile</Text>

      {/* User Info */}
      <View style={[styles.infoContainer, { backgroundColor: theme.card }]}>
        <Text style={[styles.infoText, { color: theme.text }]}>
          <Text style={styles.label}>Email: </Text>
          {currentUser.email}
        </Text>
        <Text style={[styles.infoText, { color: theme.text }]}>
          <Text style={styles.label}>User ID: </Text>
          {currentUser.userId}
        </Text>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={handleLogout}
      >
        <Text style={[styles.buttonText, { color: theme.title }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  infoContainer: {
    width: "100%",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default ProfileScreen;