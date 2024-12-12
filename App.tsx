import React from 'react';
import {
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { AuthProvider, RootNavigator } from './navigation/RootNavigation';
import { AnimationProvider } from './context/AnimationContext';
import { ThemeProvider } from './context/themeContext';
import { CartProvider } from './context/CartContext';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
      <AuthProvider>
        <CartProvider>
          <ThemeProvider>
            <AnimationProvider>
                <RootNavigator />
            </AnimationProvider>
          </ThemeProvider>
        </CartProvider>
      </AuthProvider>
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
