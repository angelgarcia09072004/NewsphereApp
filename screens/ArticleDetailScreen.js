// screens/ArticleDetailScreen.js
import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, ScrollView, TouchableOpacity,
  StyleSheet, Share, SafeAreaView, Alert, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StarRating from '../components/StarRating';
import Colors from '../constants/Colors';

const ArticleDetailScreen = ({ route, navigation }) => {
  const [article, setArticle] = useState(null);
  // Rating shown on this screen
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (route?.params?.article) {
      const receivedArticle = route.params.article;
      console.log('ArticleDetailScreen received article:', JSON.stringify(receivedArticle, null, 2)); // Debug log
      setArticle(receivedArticle);
      setRating(receivedArticle.rating || 0);
      if (receivedArticle.title) {
        navigation.setOptions({ title: receivedArticle.title.substring(0, 30) + '...' });
      }
    } else {
      console.error("ArticleDetailScreen: Article data not found in route params!");
      Alert.alert("Error", "Could not load article details.");
    }
    setIsLoading(false);
  }, [route, navigation]);

  const handleRatingChange = (newRating) => {
    console.log(`ArticleDetailScreen: Rating changed to: ${newRating}`); // Debug log
    setRating(newRating);
  };

  const handleShare = async () => {
    if (!article) {
      Alert.alert("Cannot Share", "Article details are not available.");
      return;
    }
    try {
      await Share.share({
        message: `${article.title || 'Interesting Article'}\n\n${article.description || ''}\nRead more: ${article.url || ''}\n(Shared from Newsphere)`,
        url: article.url,
        title: article.title || 'Newsphere Article'
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share the article at this time.');
      console.error('Share error:', error);
    }
  };

  // --- Loading State UI ---
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.primary || '#1A364B'} />
          <Text style={{ marginTop: 10, color: Colors.darkGrey || '#333' }}>Loading Article...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // --- Error State UI (if article loading failed) ---
  if (!article) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Ionicons name="alert-circle-outline" size={50} color={Colors.danger || 'red'} />
          <Text style={styles.errorText}>Article details could not be loaded.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const imageUrl = article?.urlToImage || article?.image;
  const title = article?.title ?? 'No Title Available';
  const sourceName = article?.source?.name || article?.source || 'Unknown Source';
  const articleDate = article?.publishedAt || article?.date;
  const displayDate = articleDate ? new Date(articleDate).toLocaleDateString() : '';
  const description = article?.description ?? '';
  const content = article?.content ?? '';

  // --- Main Render ---
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {imageUrl ? (
          <Image
            source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
            style={styles.articleImage}
            resizeMode="cover"
            onError={(e) => console.warn("Image load error:", e.nativeEvent.error)} // Use warn for non-critical errors
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="image-outline" size={50} color={Colors.grey || '#888'} />
            <Text style={styles.placeholderText}>No Image Available</Text>
          </View>
        )}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.metaContainer}>
            <Text style={styles.source}>{sourceName}</Text>
            <Text style={styles.date}>{displayDate}</Text>
          </View>

          {(description && description !== content) ? (
            <Text style={styles.description}>{description}</Text>
          ) : null}

          {content !== '' && <Text style={styles.content}>{content}</Text>}

          <View style={styles.actionsContainer}>
            {/* Rating */}
            <View style={styles.ratingSection}>
              <Text style={styles.ratingLabel}>Rate this article:</Text>
              <StarRating
                currentRating={rating}
                onRatingChange={handleRatingChange}
                size={32}
              />
            </View>

            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Ionicons name="share-social-outline" size={22} color={Colors.white || '#FFFFFF'} />
              <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white || '#FFFFFF',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: Colors.danger || 'red',
    marginTop: 10,
    textAlign: 'center'
  },
  articleImage: {
    width: '100%',
    height: 250,
    backgroundColor: Colors.lightGrey || '#f0f0f0',
  },
  imagePlaceholder: {
    width: '100%',
    height: 250,
    backgroundColor: Colors.lightGrey || '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 5,
    color: Colors.grey || '#888',
  },
  contentContainer: {
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.dark || '#333',
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  source: {
    fontSize: 13,
    color: Colors.primary || '#007BFF',
    fontWeight: '500',
    marginRight: 10,
  },
  date: {
    fontSize: 13,
    color: Colors.grey || '#666',
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: Colors.darkGrey || '#555',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.dark || '#333',
    marginBottom: 25,
  },
  actionsContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.lightGrey || '#eee',
    paddingTop: 20,
    marginTop: 10,
    alignItems: 'center', // Center the rating and share button
  },
  ratingSection: {
    marginBottom: 25,
    alignItems: 'center',
  },
  ratingLabel: {
    fontSize: 16,
    color: Colors.darkGrey || '#444',
    marginBottom: 10,
    fontWeight: '500',
  },
  shareButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary || '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20, // Rounded button
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  shareButtonText: {
    color: Colors.white || '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default ArticleDetailScreen;