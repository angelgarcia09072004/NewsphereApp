// components/CustomDrawerContent.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Platform, Linking, Alert } from 'react-native'; // Added Linking and Alert
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { AuthContext } from '../context/AuthContext';

// --- Define your social media URLs here ---
const YOUR_WEBSITE_URL = 'https://www.yourwebsite.com'; // Replace with your actual website URL
const YOUR_INSTAGRAM_URL = 'https://instagram.com/your_instagram_username'; // Replace with your Instagram URL
const YOUR_X_URL = 'https://x.com/your_x_username'; // Replace with your X (Twitter) URL

const CustomDrawerContent = (props) => {
  const { signOut } = useContext(AuthContext);

  const handleOpenURL = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Unable to open this URL: ${url}`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={styles.scrollViewContent}
          style={{ flex: 1 }}
        >
          {/*
            The "NEWSPHERE Home" highlighted item is controlled by your Drawer.Navigator's
            `drawerActiveBackgroundColor` when the "Home" route is active.
            Your MainAppDrawerNavigator.js sets it to:
            drawerActiveBackgroundColor: Colors.secondary || '#FF6F61'
            The screenshot shows a light blue. You might want to adjust this color in MainAppDrawerNavigator.js.
            e.g., drawerActiveBackgroundColor: '#3B82F6', (a shade of blue)
          */}
          <DrawerItemList {...props} />
        </DrawerContentScrollView>

        {/* Sign Out Button */}
        <TouchableOpacity onPress={signOut} style={styles.signOutButtonOuterContainer}>
          <View style={styles.signOutButtonInnerContainer}>
            <Feather name="log-out" size={22} color={Colors.drawerInactiveTintColor || Colors.grey} style={styles.signOutIcon} />
            <Text style={styles.signOutText}>Sign Out</Text>
          </View>
        </TouchableOpacity>

        {/* Social Media Icons Section */}
        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.bottomIcon} onPress={() => handleOpenURL("https://www.facebook.com/")}>
            <Feather name="facebook" size={28} color={Colors.white || '#FFFFFF'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomIcon} onPress={() => handleOpenURL("https://www.instagram.com/")}>
            <Feather name="instagram" size={28} color={Colors.white || '#FFFFFF'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomIcon} onPress={() => handleOpenURL("https://x.com/i/flow/login")}>
            <Feather name="x" size={28} color={Colors.white || '#FFFFFF'} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary, // Drawer background color (e.g., your dark blue)
  },
  container: {
    flex: 1,
  },
  scrollViewContent: {
    // paddingTop: 10, // Add if needed, e.g. if NEWSPHERE Home was a separate component
  },
  signOutButtonOuterContainer: {
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  signOutButtonInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: Platform.OS === 'android' ? 16 : 18,
  },
  signOutIcon: {
    marginRight: 32,
  },
  signOutText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.drawerInactiveTintColor || Colors.grey, // Color for "Sign Out" text
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    // Use a subtle white/transparent border for dark backgrounds
    borderTopColor: Colors.white ? 'rgba(255,255,255,0.1)' : (Colors.lightGrey || '#DDDDDD'),
    paddingBottom: Platform.OS === 'ios' ? 25 : 15,
  },
  bottomIcon: {
    padding: 8,
  },
});

export default CustomDrawerContent;