// navigation/RootNavigator.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import MainAppDrawerNavigator from './MainAppDrawerNavigator';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import Colors from '../constants/Colors'; // Assuming you have this for loading indicator color

const AuthStackNav = createNativeStackNavigator();

const AuthNavigator = () => (
  <AuthStackNav.Navigator screenOptions={{ headerShown: false }}>
    <AuthStackNav.Screen name="Login" component={LoginScreen} />
    <AuthStackNav.Screen name="SignUp" component={SignUpScreen} />
  </AuthStackNav.Navigator>
);

const RootNavigator = () => {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary || '#1A2F4B'} />
        <Text style={styles.loadingText}>Loading NEWSPHERE...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken == null ? <AuthNavigator /> : <MainAppDrawerNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white || '#FFFFFF',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.primary || '#1A2F4B',
  }
});

export default RootNavigator;