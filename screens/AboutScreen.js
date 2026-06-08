import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import Colors from '../constants/Colors'; 

const AboutScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(true);

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => {
       if (navigation.canGoBack()) {
            navigation.goBack();
        }
    }, 300); 
  };

   useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setModalVisible(true);
    });

    return unsubscribe; 
  }, [navigation]);


  return (
    <View style={styles.backgroundContainer}>
      <Modal
        animationType="fade" 
        transparent={true} 
        visible={isModalVisible}
        onRequestClose={closeModal} 
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>About Newsphere</Text>
                    <TouchableOpacity onPress={closeModal} style={styles.closeIcon}>
                    <Feather name="x" size={28} color={Colors.darkGrey} />
                    </TouchableOpacity>
                </View>

                <View style={styles.separator} />

                <Text style={styles.modalBodyText}>
                    Welcome to Newsphere — your go-to source for curated news on trending topics, global events, sports, business, and more. We deliver timely and reliable updates to keep you informed, anytime and anywhere.
                </Text>
                <Text style={styles.modalBodyText}>
                    This website demonstrates modern web features. For this demo, your login status, bookmarks, and comments are stored locally using your browser’s localStorage.
                </Text>

                <View style={styles.separator} />
                <Text style={styles.contactTitle}>Contact Us</Text>
                <Text style={styles.contactText}>
                    <Feather name="mail" size={16} color={Colors.primary} /> Email: newsphere@gmail.com
                </Text>
                <Text style={styles.contactText}>
                    <Feather name="phone" size={16} color={Colors.primary} /> Phone: +1 (555) 123-4567
                </Text>
                <Text style={styles.contactText}>
                    <Feather name="globe" size={16} color={Colors.primary} /> Website: www.newsphere-demo.com
                </Text>
                 <View style={styles.modalFooter}>
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                 </View>
             </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
      flex: 1,
       backgroundColor: Colors.lightGrey || '#eee',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
  },
  modalContent: {
    width: '90%', 
    maxWidth: 400, 
    maxHeight: '80%', 
    backgroundColor: 'rgba(255, 255, 255, 0.97)', 
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 25,
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary || '#1A374D',
    flex: 1, 
    marginRight: 10, 
  },
  closeIcon: {
      padding: 5, 
  },
  separator: {
      height: 1,
      backgroundColor: Colors.grey || '#ccc',
      marginVertical: 15,
  },
  modalBodyText: {
    fontSize: 15,
    color: Colors.darkGrey || '#333',
    lineHeight: 22,
    marginBottom: 15,
  },
  contactTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: Colors.primary || '#1A374D',
      marginBottom: 10,
  },
  contactText: {
      fontSize: 15,
      color: Colors.darkGrey || '#333',
      lineHeight: 24,
      marginBottom: 8,
      flexDirection: 'row', 
      alignItems: 'center', 
  },
  modalFooter: {
      marginTop: 25,
      alignItems: 'flex-end', 
  },
  closeButton: {
    backgroundColor: Colors.secondary || '#6c757d', 
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  closeButtonText: {
    color: Colors.white || '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AboutScreen;
// -------------------------