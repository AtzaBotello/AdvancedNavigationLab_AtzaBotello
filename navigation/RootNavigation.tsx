import React, { useState, createContext, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigation/AuthNavigation";
import AppNavigator from "./AppNavigation/AppNavigation";

import AsyncStorage from "@react-native-async-storage/async-storage";
import ThemedStatusBar from "../components/ThemeStatusBar";

import 'react-native-get-random-values';
import * as uuid from 'uuid';// UUID library to generate unique user IDs

// Define the types for the Auth Context
type User = {
  userId: string;
  email: string;
  password: string;
};

type AuthContextType = {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
};


const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Context Provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(false);

  // Load users from AsyncStorage on startup
  useEffect(() => {
    const loadUsers = async () => {
      const storedUsers = await AsyncStorage.getItem("users");
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
    };

    loadUsers();
  }, []);

  const saveUsers = async (updatedUsers: User[]) => {
    setUsers(updatedUsers);
    await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log("login", email, password);
    setLoading(true);
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      setCurrentUser(user);
      await AsyncStorage.setItem("currentUser", JSON.stringify(user));
      setLoading(false);
      return true;
    }

    setLoading(false);
    return false;
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);

    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      return false;
    }

    const newUser: User = {
      userId: uuid.v4(), // Generate a unique user ID
      email,
      password,
    };

    const updatedUsers = [...users, newUser];
    await saveUsers(updatedUsers);

    setCurrentUser(newUser);
    await AsyncStorage.setItem("currentUser", JSON.stringify(newUser));

    setLoading(false);

    return true;
  };

  const logout = async () => {
    setCurrentUser(null);
    await AsyncStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

// Root Navigator
export const RootNavigator: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <>
          <ThemedStatusBar />
          <AppNavigator />
        </>
      ) : <AuthNavigator />}
    </NavigationContainer>
  );
};
