// screens/SettingsScreen.tsx

import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";

import { useAnimation } from "../../context/AnimationContext";
import { useTheme } from "../../context/themeContext";

const SettingsScreen: React.FC = () => {
  const { isAnimationEnabled, toggleAnimation } = useAnimation();
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Settings</Text>

      {/* Screen Animation Toggle */}
      <View style={styles.settingItem}>
        <Text style={[styles.settingText, { color: theme.text }]}>Enable Screen Animation</Text>
        <Switch
          value={isAnimationEnabled}
          onValueChange={toggleAnimation}
        />
      </View>

      {/* Dark/Light Mode Toggle */}
      <View style={styles.settingItem}>
        <Text style={[styles.settingText, { color: theme.text }]}>Dark Mode</Text>
        <Switch onValueChange={toggleTheme} value={theme.background === "#121212"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  settingText: {
    fontSize: 16,
  },
});

export default SettingsScreen;
