// screens/LoginScreen.js
import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar as SystemStatusBar,
  Alert, // Added Alert
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { AuthContext } from '../context/AuthContext';
import Colors from '../constants/Colors';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

let headerLogoIcon = null;
try {
  headerLogoIcon = require('../assets/images/logo.png');
} catch (error) {
  console.log("LoginScreen: Could not load header logo icon. Check path:", error.message);
}

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isLoading, error, setError } = useContext(AuthContext);
  const insets = useSafeAreaInsets();

  const handleLogin = async () => {
    if (!email || !password) { setError('Please enter both email and password.'); return; }
    await signIn(email, password);
  };

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => setError(null));
    return unsubscribeFocus;
  }, [navigation, setError]);

  useEffect(() => {
    let timer;
    if (error) { timer = setTimeout(() => setError(null), 3500); }
    return () => clearTimeout(timer);
  }, [error, setError]);

  const FIXED_HEADER_HEIGHT = 60;

  // Function to handle footer press
  const handleFooterPress = () => {
    Alert.alert(
      "Copyright Information",
      `© ${new Date().getFullYear()} Newsphere. All Rights Reserved.`,
      [{ text: "OK" }]
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaOuter} edges={['left', 'right', 'bottom']}>
      <ExpoStatusBar style="light" backgroundColor={Colors.primary} />

      <View style={[
          styles.customHeader,
          {
            height: FIXED_HEADER_HEIGHT + (Platform.OS === 'ios' ? insets.top : SystemStatusBar.currentHeight || 0),
            paddingTop: (Platform.OS === 'ios' ? insets.top : SystemStatusBar.currentHeight || 0)
          }
        ]}
      >
        <View style={styles.headerLeftIconContainer} />
        <View style={styles.headerCenterContainer}>
          {headerLogoIcon && (
            <Image
              source={headerLogoIcon}
              style={styles.headerLogoImage}
              onError={(e) => console.log("LoginScreen: Error loading header logo:", e.nativeEvent.error)}
            />
          )}
          <Text style={styles.headerTitleText}>Newsphere</Text>
        </View>
        <View style={styles.headerRightIconContainer} />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? FIXED_HEADER_HEIGHT + insets.top : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContentContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Text style={styles.formTitle}>Login</Text>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor={Colors.placeholder || '#A0A0A0'}
                value={email}
                onChangeText={(text) => { setEmail(text); if (error) setError(null); }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={Colors.placeholder || '#A0A0A0'}
                value={password}
                onChangeText={(text) => { setPassword(text); if (error) setError(null); }}
                secureTextEntry
              />
            </View>
            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.loginButtonText}>Login</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.signUpLinkContainer} onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpText}>
                Don't have an account?{' '}
                <Text style={styles.signUpActionText}>Sign Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* MODIFIED FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleFooterPress}>
          <Text style={styles.footerText}>© {new Date().getFullYear()} Newsphere. All Rights Reserved.</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaOuter: { flex: 1, backgroundColor: Colors.primary },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
  },
  headerLeftIconContainer: {
    minWidth: 44,
    padding: 8,
  },
  headerCenterContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLogoImage: {
    width: 28,
    height: 28,
    marginRight: 8,
    resizeMode: 'contain',
  },
  headerTitleText: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRightIconContainer: {
    minWidth: 44,
    padding: 8,
  },
  keyboardAvoidingContainer: { flex: 1, backgroundColor: Colors.lightPageBackground || '#F0F2F5' },
  scrollContentContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 30 },
  card: { backgroundColor: Colors.white, borderRadius: 12, paddingHorizontal: 25, paddingVertical: 30, width: '90%', maxWidth: 400, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 6, marginBottom: 20 },
  formTitle: { fontSize: 28, fontWeight: 'bold', color: Colors.primary, textAlign: 'center', marginBottom: 30 },
  inputGroup: { marginBottom: 20 },
  inputLabel: { fontSize: 14, color: Colors.textDark || '#333333', marginBottom: 8, fontWeight: '500' },
  input: { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.inputBorder || '#CED4DA', borderRadius: 8, paddingHorizontal: 15, paddingVertical: Platform.OS === 'ios' ? 14 : 12, fontSize: 16, color: Colors.textDark || '#333333' },
  loginButton: { backgroundColor: Colors.primary, paddingVertical: 15, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 15, marginBottom: 25 },
  buttonDisabled: { backgroundColor: Colors.grey },
  loginButtonText: { color: Colors.white, fontSize: 16, fontWeight: 'bold' },
  signUpLinkContainer: { alignItems: 'center', marginTop: 10 },
  signUpText: { fontSize: 14, color: Colors.textDark || '#555555' },
  signUpActionText: { color: Colors.secondary || '#3498DB', fontWeight: 'bold' },
  errorText: { color: Colors.error || 'red', textAlign: 'center', marginBottom: 15, fontSize: 14, fontWeight: '500' },
  footer: { backgroundColor: Colors.primary, paddingVertical: 15, alignItems: 'center', justifyContent: 'center' },
  footerText: { color: Colors.whiteAlpha || 'rgba(255,255,255,0.8)', fontSize: 12 },
});

export default LoginScreen;