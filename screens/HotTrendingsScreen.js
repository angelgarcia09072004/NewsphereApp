// screens/HotTrendingsScreen.js
import React from 'react';
import NewsCard from '../components/NewsCard';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import Colors from '../constants/Colors';  

// --- Function to create recent dates easily ---
const getRecentDate = (hoursAgo) => {
  const date = new Date();
  date.setHours(date.getHours() - hoursAgo);
  return date.toISOString(); 
};

const hotNewsData = [
  {
    id: 'newscard1',
    title: 'Ateneo out of women’s volleyball title race for 3rd straight year; FEU boosts Final Four bid',  
    source: { name: 'Sport Fest' },
    date: getRecentDate(2),  
    image: require('../assets/images/news1_vball.png'),  
    description: 'The Ateneo Blue Eagles crashed out of the UAAP women’s volleyball title picture as the contending FEU Lady Tamaraws rolled to a four-set win.',
    content: `MANILA, Philippines – For the third straight season, the Ateneo Blue Eagles crashed out of the UAAP women’s volleyball title picture as the contending FEU Lady Tamaraws rolled to a four-set win, 25-23, 22-25, 25-22, 25-13, at the PhilSports Arena on Wednesday, April 9.
    
Third-running FEU stayed half a game behind No. 2 La Salle (8-3) with an 8-4 record, keeping the door to the two Final Four twice-to-beat bids wide open with top-ranked NU (10-2) and No. 4 UST (7-4) also in the mix.\n\nAteneo, meanwhile, sunk to seventh place with a 4-8 slate, below an Adamson side (4-7) still mathematically in the Final Four picture.

Faida Bakanke led all scorers with 19 points off 15 attacks and 4 blocks, while all-around threat Gerzel Petallo scattered a triple-double of 13 points, 14 excellent receptions, and 12 digs.\n\nRookie middle blocker and Alas Pilipinas tryout invitee Clarisse Loresco also made the most of her two sets on the floor, tallying 7 points with 3 blocks as FEU came within a win of a Final Four return.
    
On the heels of three nip-and-tuck sets that put the Lady Tamaraws up two sets to one, Ateneo met an early derailment to its comeback bid as it fell, 8-3, no thanks to multiple errors and Chenie Tagaod block points on the Blue Eagle attackers.\n\nAteneo only got as near as 4, 12-8, before FEU staged one final breakaway to the tune of an 8-2 run, ending with a 20-10 separation that the Blue Eagles never recovered from.`,

  },
  {
    id: 'newscard2',
    title: 'Major Earthquake Causes Widespread Damage Death toll exceeds 3,500 in Myanmar quake',
    source: { name: 'Global News Agency' },
    date: getRecentDate(5),  
    image: require('../assets/images/news2_vball.png'),  
    url: 'https://www.example.com/earthquake-news-1',
    description: `Myanmar Fire Services Department said Monday that rescue teams had recovered 10 bodies from the rubble of a collapsed building in Mandalay, Myanmar’s second biggest city.

It said international rescuers from Singapore, Malaysia and India had returned to their countries after their work to find survivors was considered completed.

The number of rescue teams operating in the residential areas of Naypyitaw has been steadily decreasing.
The 7.7 magnitude quake hit a wide swath of the country, causing significant damage to six regions and states. The earthquake left many areas without power, telephone or cell connections and damaged roads and bridges, making the full extent of the devastation hard to assess.
Heavy rains and winds disrupted rescue and relief operations on Saturday night and added to the misery of the homeless forced to sleep in the open. The weather forecast for this week said scattered showers and thunderstorms are possible across the country.

Myanmar’s military government and its battlefield opponents, meanwhile, have been trading accusations over alleged violations of ceasefire declarations each had declared to ease earthquake relief efforts.`,
  },
  {
    id: 'newscard3',
    title: 'UST player relishes ‘second chance’ at life, basketball after brain surgery',
    source: { name: 'City Sports Daily' },
    date: getRecentDate(25),  
    image: require('../assets/images/news3_vball.png'),  
    url: 'https://www.example.com/local-team-win',
    description: `After a successful brain surgery last January, the 19-year-old Loreto is back on the basketball court, hoping to rebound from lost time with the reigning UAAP champion UST in the 2025 NBTC National Finals. 

For Loreto, returning to the team meant more than just a basketball revival; it also meant a new chapter in life

“I’m super thankful for everyone, especially God, for this second chance at life,” Loreto told Rappler in Filipino. 

“Everyone in the team allowed me this second chance. They kept strengthening my character and made me realize how important life really is.”

Loreto, who plays center for UST, did not see action in the entirety of the UAAP Season 87, where the Tiger Cubs picked up their first juniors basketball title in 24 years. 

Last January 12, Loreto was rushed to the hospital due to severe headaches and vomiting before doctors diagnosed him with pituitary macroadenoma, a tumor that affects the pituitary gland. `,
 
  },
];


const HotTrendingsScreen = () => {
  const renderNewsItem = ({ item }) => (
    <NewsCard
      item={item}  
    />
  );

  return (
    <View style={styles.screen}>
       <View style={styles.titleContainer}>
           <View style={styles.titleIndicator} />
           <Text style={styles.titleText}>Hot Trendings</Text>
       </View>
      <FlatList
        data={hotNewsData}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
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
      backgroundColor: Colors.white,
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

export default HotTrendingsScreen;