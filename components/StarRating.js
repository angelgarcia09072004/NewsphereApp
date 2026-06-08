// components/StarRating.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors'; 

const StarRating = ({ maxRating = 5, currentRating, onRatingChange, size = 30, style }) => {
  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      <TouchableOpacity
        key={i}
     
        onPress={() => {
            if (onRatingChange) {
                 console.log(`--- StarRating: Star ${i} pressed, calling onRatingChange(${i}) ---`); // Log press
                 onRatingChange(i); 
            } else {
                 console.warn("StarRating: onRatingChange prop is missing!");
            }
        }}
     
      >
        <Ionicons
          name={i <= currentRating ? 'star' : 'star-outline'}
          size={size} 
          color={Colors.accent || '#FFD700'} 
          style={styles.star}
        />
      </TouchableOpacity>
    );
  }
  return <View style={[styles.starRatingContainer, style]}>{stars}</View>;
};

const styles = StyleSheet.create({
  starRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginHorizontal: 2, // Spacing between stars
  },
});

export default StarRating;