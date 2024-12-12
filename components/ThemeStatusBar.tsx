import React from "react";
import { StatusBar } from "react-native";
import { useTheme } from "../context/themeContext";

const ThemedStatusBar: React.FC = () => {
    const { theme } = useTheme();

    return (
      <StatusBar
        barStyle={theme.background === "#FFFFFF" ? "dark-content" : "light-content"}
        backgroundColor={theme.background} // Ensures the status bar matches the theme background
        translucent={false} // Ensures it doesn’t overlap the app content
      />
    );
};

export default ThemedStatusBar;