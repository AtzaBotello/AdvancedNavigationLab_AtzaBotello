import React, { createContext, useState, useContext, useEffect, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../navigation/RootNavigation";

type CartItem = {
  id: number; // Matches the "id" field from the product
  title: string; // Matches the "title" field from the product
  price: number; // Matches the "price" field from the product
  quantity: number; // Quantity of the product in the cart
  image: string[]; // Matches the "image" field from the product
  thumbnail: string; // Matches the "thumbnail" field from the product
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  loadUserCart: (userId: string) => Promise<void>;
  logoutUserCart: () => void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const { currentUser } = useAuth();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Helper function to get the storage key based on the user ID
  const getStorageKey = (userId: string) => `cart_${userId}`;

  const loadUserCart = async (userId: string) => {
    if (!userId || userId === "") {
      return;
    }

    setCurrentUserId(userId);
    const storedCart = await AsyncStorage.getItem(getStorageKey(userId));
    setCart(storedCart ? JSON.parse(storedCart) : []);

    console.log("loadUserCart", storedCart);
  };

  const saveCart = async (updatedCart: CartItem[]) => {
    for (let index = 0; index < updatedCart.length; index++) {
      const element = updatedCart[index];
      console.log('element', element.title, element.quantity);
    }
    if (currentUserId) {
      setCart(updatedCart);
      await AsyncStorage.setItem(getStorageKey(currentUserId), JSON.stringify(updatedCart));
    }
    console.log('updated cart', cart);
    console.log('current cart', updatedCart)
  };

  const addToCart = (item: CartItem) => {
    console.log('add to cart', item.title, item.quantity);
    console.log('cart previous', cart);
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
          : cartItem
      );
      saveCart(updatedCart);
    } else {
      saveCart([...cart, item]);
    }
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
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

  useEffect(() => {
    let isCartLoaded = false;
  
    const fetchUserCart = async () => {
      if (currentUser && !isCartLoaded) {
        console.log(`Fetching cart for user: ${currentUser.userId}`);
        loadUserCart(currentUser.userId);
        isCartLoaded = true;
      }
    };
  
    fetchUserCart();
  }, [currentUser]);

  const value: CartContextType = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      getTotal,
      loadUserCart,
      logoutUserCart,
    }),
    [
      cart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotal,
        loadUserCart,
        logoutUserCart,
    ]
  );

  return (
    <CartContext.Provider
      value={value}
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