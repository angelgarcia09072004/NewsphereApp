// App.js
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import RootNavigator from './navigation/RootNavigator';
import { StatusBar } from 'expo-status-bar';
import Colors from './constants/Colors';
import { LogBox } from 'react-native'; // Import LogBox

// --- ADD THIS SECTION TO IGNORE THE SPECIFIC WARNING ---
LogBox.ignoreLogs([
  "Text strings must be rendered within a <Text> component.",
  // You can add other specific warning messages here if needed
]);
// --- END SECTION ---

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="light" backgroundColor={Colors.primary} />
      <RootNavigator />
    </AuthProvider>
  );
}