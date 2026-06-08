import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import NewsCard from '../components/NewsCard'; 
import Colors from '../constants/Colors'; 

const getRecentDate = (hoursAgo) => {
  const date = new Date();
  date.setHours(date.getHours() - hoursAgo);
  return date.toISOString();
};

const entertainmentNewsData = [
  {
    id: 'entertainment_1',
    title: 'Nora Aunor: A Look Back at the Superstar\'s National Artist Journey',
    source: { name: 'PEP.ph' }, 
    date: getRecentDate(48),       
    image: require('../assets/images/intertainment_news1.png'), 
    description: 'Celebrating the legacy and enduring impact of Nora Aunor, proclaimed National Artist for Film and Broadcast Arts.', // Example description
    content: `MANILA, Philippines – Nora Aunor, the one and only Superstar of Philippine cinema, continues to be celebrated following her proclamation as a National Artist for Film and Broadcast Arts in 2022. Her career, spanning decades, includes iconic roles in critically acclaimed films like "Himala," "Bona," and "The Flor Contemplacion Story."

Aunor's contributions extend beyond acting; her influence on popular culture and her unique connection with her fans remain unparalleled. This recognition solidified her status as a pillar of the Philippine entertainment industry. Industry colleagues and fans alike continue to express admiration for her talent and dedication to her craft.

The National Artist award is the highest national recognition given to Filipino individuals who have made significant contributions to the development of Philippine arts.`,  
  },
  {
    id: 'entertainment_2',
    title: 'New On-Screen Couple Sparks Chemistry in Upcoming Rom-Com \'Summer Nights\'',  
    source: { name: 'Star Cinema Updates' },  
    date: getRecentDate(8),  
    image: require('../assets/images/intertainment_news2.png'),  
    description: 'Get a first look at the undeniable chemistry between the lead stars of the highly anticipated romantic comedy, set to release this summer.', 
    content: `QUEZON CITY – Excitement is building for the upcoming romantic comedy "Summer Nights," starring the fresh pairing of rising stars (replace with actual actor names if known, e.g., Jane Doe and John Smith). Recently released stills from the set showcase the palpable chemistry between the leads.

The film, directed by acclaimed filmmaker (replace with director's name), tells the story of two strangers who find unexpected love during a picturesque summer getaway. Fans are already buzzing online, eagerly anticipating the movie's release.

"We wanted to capture the feeling of spontaneous summer love, and our leads brought that magic to the screen," the director shared in a recent interview. "Their energy together is fantastic." "Summer Nights" is slated for a nationwide release in July 2024.`,  
    url: 'https://www.example.com/summer-nights-romcom-preview',  
  },
  {
    id: 'entertainment_3',
    title: 'President Marcos Jr. Attends Gala Premiere of Historical Drama',   
    source: { name: 'GMA News Online' },  
    date: getRecentDate(28),  
    image: require('../assets/images/intertainment_news3.png'),  
    description: 'President Ferdinand Marcos Jr. graced the premiere night of the new historical film "(Film Title)", lending support to the local film industry.', 
    content: `PASAY CITY – President Ferdinand "Bongbong" Marcos Jr. was the guest of honor at the star-studded gala premiere of the historical drama "(Replace with Film Title)" held Tuesday evening at the SM Mall of Asia. The event saw the attendance of the film's cast, crew, industry stakeholders, and government officials.

The President, in his brief remarks, emphasized the importance of Filipino storytelling and congratulated the team behind the film for their work in bringing a significant part of Philippine history to the big screen. He was seen mingling with guests, including veteran actor (replace with name, e.g., Bembol Roco, seen in the photo).

The film "(Film Title)" explores (briefly mention the film's subject matter) and aims to educate and entertain audiences about the nation's past. Its public screening is scheduled to begin next week.`,  
    url: 'https://www.example.com/bbm-attends-film-premiere',  
  },
];

// --- EntertainmentScreen Component ---
const EntertainmentScreen = () => {  

  const renderNewsItem = ({ item }) => (
    <NewsCard
      item={item}
    />
  );

  return (
    <View style={styles.screen}>
       <View style={styles.titleContainer}>
           <View style={styles.titleIndicator} />
           <Text style={styles.titleText}>Entertainment</Text>
       </View>
      <FlatList
        data={entertainmentNewsData}  
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.lightGrey || '#eee',
  },
  titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingTop: 20,
      paddingBottom: 15,
      backgroundColor: Colors.white || '#fff',
  },
  titleIndicator: {
      width: 5,
      height: 24,
      backgroundColor: Colors.accent || '#6998AB', 
      marginRight: 10,
  },
  titleText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: Colors.primary || '#1A374D',
  },
  list: {
    paddingTop: 5,
    paddingBottom: 20,
  },
});

export default EntertainmentScreen;