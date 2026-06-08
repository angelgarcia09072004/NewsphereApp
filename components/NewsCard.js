// components/NewsCard.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, Share, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { formatDistanceToNowStrict } from 'date-fns';

const NewsCard = ({ item }) => {
  const navigation = useNavigation();
  const [cardRating, setCardRating] = useState(item?.rating || 0);

  if (!item) {
    console.warn("NewsCard received invalid item prop (is null or undefined):", item);
    return null;
  }

  // Safely extract data
  const imageUrl = item.urlToImage || item.image || item.imageSource;
  const title = item.title || 'Untitled Article';
  const sourceName = item.source?.name || item.source || 'Unknown Source';
  const date = item.publishedAt || item.date; // Use the most likely date field
  const articleUrl = item.url || 'https://newsphere-app.com';

  // --- FORMATTING ---
  let displayDate = '';
  if (date) {
    try {
      displayDate = formatDistanceToNowStrict(new Date(date), { addSuffix: true });
    } catch (e) {
       console.error("NewsCard: Error formatting date:", date, e);
       try {
           displayDate = new Date(date).toLocaleDateString();
       } catch {
           displayDate = 'Invalid Date';
       }
    }
  }

  // --- DEBUG LOGS ---
  console.log('--- NewsCard Rendering ---');
  console.log('Item ID (if available):', item.id);
  console.log('Title:', title, '(type:', typeof title, ')');
  console.log('SourceName:', sourceName, '(type:', typeof sourceName, ')');
  console.log('DisplayDate:', displayDate, '(type:', typeof displayDate, ')');
  console.log('ImageUrl:', imageUrl, '(type:', typeof imageUrl, ')');
  console.log('--------------------------');
  // --- END DEBUG LOGS ---

  const handleNavigateToDetail = () => {
    // console.log('--- NewsCard: Navigating to ArticleDetail with item: ---');
    // console.log(JSON.stringify(item, null, 2)); // Can be very verbose
    // console.log('---------------------------------------------------------');

    if (!item) { // Should be caught by the initial check, but good for safety
       console.error("NewsCard: Cannot navigate, article data is missing.");
       return;
    }
    navigation.navigate('ArticleDetail', { article: item });
  };

  const handleRateOnCard = (ratingValue) => {
      setCardRating(ratingValue);
      // console.log(`Card rated: ${ratingValue} stars for article ID: ${item.id}`);
      Alert.alert('Rated', `You rated "${title}" ${ratingValue} stars.`); // Use 'title' here as item.title might be undefined
  };

  const handleShareFromCard = async () => {
    try {
      await Share.share({
        message: `${title}\nRead more: ${articleUrl}\n(Shared from Newsphere)`,
        url: articleUrl,
        title: title
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share the article from the card.');
      console.error('NewsCard Share error:', error.message);
    }
  };


  return (
    <TouchableOpacity
       style={styles.cardOuterContainer}
       onPress={handleNavigateToDetail}
       activeOpacity={0.8}
    >
      <View style={styles.card}>
          {imageUrl ? (
             <Image source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl} style={styles.image} resizeMode="cover"/>
          ) : (
             <View style={[styles.image, styles.imagePlaceholder]}>
                 <Ionicons name="image-outline" size={50} color={Colors.grey || '#A9A9A9'} />
              </View>
          )}
          <View style={styles.content}>
            <Text style={styles.title} numberOfLines={3}>
              {title}
            </Text>

            <View style={styles.metaContainer}>
              <Text style={styles.metaText} numberOfLines={1}>{sourceName}</Text>
              {displayDate ? ( // Only render if displayDate has a value
                 <>
                  <Text style={styles.metaSeparator}>•</Text>
                  <Text style={styles.metaText}>{displayDate}</Text>
                 </>
              ) : null}
            </View>

            <View style={styles.actions}>
              {/* Rating Stars */}
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((starValue) => (
                  <TouchableOpacity
                    key={starValue}
                    onPress={() => handleRateOnCard(starValue)}
                    style={styles.starButton}
                  >
                    <Feather
                      name="star"
                      size={20}
                      color={starValue <= cardRating ? (Colors.accent || 'orange') : (Colors.grey || '#ccc')}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity style={styles.actionButton} onPress={handleShareFromCard}>
                <Feather name="share-2" size={18} color={Colors.darkGrey || '#555555'} />
              </TouchableOpacity>
            </View>
          </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardOuterContainer: {
      marginHorizontal: 15,
      marginVertical: 10,
  },
  card: {
    backgroundColor: Colors.white || '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth: Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 0,
    borderColor: Colors.lightGrey || '#DDDDDD',
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: Colors.lightGrey || '#EEEEEE',
  },
  imagePlaceholder: {
     justifyContent: 'center',
     alignItems: 'center',
  },
  content: {
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.black || '#000000',
    lineHeight: 23,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  metaText: {
    fontSize: 12,
    color: Colors.darkGrey || '#555555',
    flexShrink: 1,
  },
  metaSeparator: {
      fontSize: 12,
      color: Colors.darkGrey || '#555555',
      marginHorizontal: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.lightGrey || '#DDDDDD',
  },
  ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  starButton: {
    paddingHorizontal: 2,
    paddingVertical: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
});

export default NewsCard;