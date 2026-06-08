// context/AuthContext.js
import React, { createContext, useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

const USERS_STORAGE_KEY = 'newsphere_users';
const LOGGED_IN_USER_KEY = 'newsphere_logged_in_user';

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await AsyncStorage.getItem(LOGGED_IN_USER_KEY);
      } catch (e) {
        console.error("Failed to retrieve user token:", e);
      }
      setUserToken(token);
      setIsLoading(false);
    };
    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      userToken,
      isLoading,
      error,
      setError,
      signIn: async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
          const storedUsers = await AsyncStorage.getItem(USERS_STORAGE_KEY);
          const users = storedUsers ? JSON.parse(storedUsers) : [];
          const foundUser = users.find(
            (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
          );

          if (foundUser) {
            await AsyncStorage.setItem(LOGGED_IN_USER_KEY, foundUser.email); // Store user's email as token
            setUserToken(foundUser.email); // Set token to user's email
            return { success: true, user: foundUser }; // Indicate success
          } else {
            setError('Invalid email or password.');
            return { success: false, error: 'Invalid email or password.' }; // Indicate failure
          }
        } catch (e) {
          console.error("Sign in error:", e);
          setError('Sign in failed. Please try again.');
          return { success: false, error: 'Sign in failed. Please try again.' }; // Indicate failure
        } finally { // Ensure isLoading is set to false in all cases
            setIsLoading(false);
        }
      },
      signOut: async () => {
        setIsLoading(true);
        setError(null);
        try {
          await AsyncStorage.removeItem(LOGGED_IN_USER_KEY);
        } catch (e) {
          console.error("Sign out error:", e);
        }
        setUserToken(null);
        setIsLoading(false);
      },
      signUp: async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
          const storedUsers = await AsyncStorage.getItem(USERS_STORAGE_KEY);
          let users = storedUsers ? JSON.parse(storedUsers) : [];

          if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
            setError('This email is already registered.');
            setIsLoading(false);
            return { success: false, error: 'This email is already registered.' }; // Return failure
          }

          // Create a new user object (you can add more fields like id, name later)
          const newUser = { email, password }; // In a real DB, password would be hashed
          users.push(newUser);
          await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
          
          // --- DO NOT LOG IN THE USER AUTOMATICALLY ---
          // await AsyncStorage.setItem(LOGGED_IN_USER_KEY, email); // Removed
          // setUserToken(email); // Removed

          console.log('User registered:', newUser); // For debugging
          setIsLoading(false);
          return { success: true }; // Return success

        } catch (e) {
          console.error("Sign up error:", e);
          setError('Sign up failed. Please try again.');
          setIsLoading(false);
          return { success: false, error: 'Sign up failed. Please try again.' }; // Return failure
        }
      },
    }),
    // Add setIsLoading to dependency array if it's not implicitly handled by closures
    [userToken, isLoading, error, setError]
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};