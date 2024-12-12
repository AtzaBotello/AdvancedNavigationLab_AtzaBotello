import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CartItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  loadUserCart: (userId: string) => Promise<void>;
  logoutUserCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Helper function to get the storage key based on the user ID
  const getStorageKey = (userId: string) => `cart_${userId}`;

  const loadUserCart = async (userId: string) => {
    console.log("loadUserCart", userId);
    if (!userId || userId === "") {
      return;
    }

    setCurrentUserId(userId);
    const storedCart = await AsyncStorage.getItem(getStorageKey(userId));
    setCart(storedCart ? JSON.parse(storedCart) : []);

    console.log("loadUserCart", storedCart);
  };

  const saveCart = async (updatedCart: CartItem[]) => {
    if (currentUserId) {
      setCart(updatedCart);
      await AsyncStorage.setItem(getStorageKey(currentUserId), JSON.stringify(updatedCart));
    }
  };

  const addToCart = (item: CartItem) => {
    const existingItem = cart.find((cartItem) => cartItem.productId === item.productId);
    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.productId === item.productId
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
          : cartItem
      );
      saveCart(updatedCart);
    } else {
      saveCart([...cart, item]);
    }
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    saveCart(updatedCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const logoutUserCart = () => {
    setCart([]);
    setCurrentUserId(null);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotal,
        loadUserCart,
        logoutUserCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};