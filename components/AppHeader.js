import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

const AppHeader = ({ title = 'Newsphere' }) => {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.header}>
 /* Hamburger Button Style: styles.menuButton. */ 
      <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
        <Feather name="menu" size={30} color={Colors.white} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.placeholder} />
    </View>
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  header: { 
    height: Platform.OS === 'android' ? 59 + StatusBar.currentHeight : 80,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
    width: '100%',
    backgroundColor: Colors.primary,
    flexDirection: 'row',       
    alignItems: 'center',        
    justifyContent: 'space-between', 
    paddingHorizontal: 15,
  },
  menuButton: { 
    padding: 5,
  },
  titleContainer: { 
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: { 
    width: 28,
    height: 28,
    marginRight: 10,
    tintColor: Colors.white,
  },
  title: { 
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: { 
    width: 38, 
  },
});

export default AppHeader;