import React from 'react';
import {
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { AuthProvider, RootNavigator } from './navigation/RootNavigation';
import { AnimationProvider } from './context/AnimationContext';
import { ThemeProvider } from './context/themeContext';
import { CartProvider } from './context/CartContext';

// Create a client
const queryClient = new QueryClient();

/*
import AsyncStorage from '@react-native-async-storage/async-storage';

const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('Storage successfully cleared!');
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};

clearStorage();*/

/*
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAllStorage = async () => {
  try {
    // Get all keys
    const keys = await AsyncStorage.getAllKeys();
    if (keys.length === 0) {
      console.log('No data in AsyncStorage.');
      return;
    }

    // Get all key-value pairs
    const values = await AsyncStorage.multiGet(keys);

    // Log all key-value pairs
    console.log('AsyncStorage Content:');
    values.forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
  } catch (error) {
    console.error('Error fetching AsyncStorage data:', error);
  }
};

getAllStorage();*/

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <ThemeProvider>
            <AnimationProvider>
                <RootNavigator />
            </AnimationProvider>
          </ThemeProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  globalContainer: { flex: 1, backgroundColor: "#fff" },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
