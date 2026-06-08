// screens/HotTrendingsScreen.js
import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import NewsCard from '../components/NewsCard';  
import Colors from '../constants/Colors';  
 
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
    title: 'UST player relishes ‘second chance’ at life, basketball after brain surgery',
    source: { name: 'SportFeast' },
    date: getRecentDate(5),  
    image: require('../assets/images/news3_vball.png'),  
    content: `After a successful brain surgery last January, the 19-year-old Loreto is back on the basketball court, hoping to rebound from lost time with the reigning UAAP champion UST in the 2025 NBTC National Finals. 

For Loreto, returning to the team meant more than just a basketball revival; it also meant a new chapter in life

“I’m super thankful for everyone, especially God, for this second chance at life,” Loreto told Rappler in Filipino. 

“Everyone in the team allowed me this second chance. They kept strengthening my character and made me realize how important life really is.”

Loreto, who plays center for UST, did not see action in the entirety of the UAAP Season 87, where the Tiger Cubs picked up their first juniors basketball title in 24 years. 

Last January 12, Loreto was rushed to the hospital due to severe headaches and vomiting before doctors diagnosed him with pituitary macroadenoma, a tumor that affects the pituitary gland. `,
  },
  {
    id: 'newscard3',
    title: 'Doncic, Reaves combine for 61 as Lakers snap 4-game skid at slumping Suns’ expense',
    source: { name: 'UpSportNBA' },
    date: getRecentDate(25),  
    image: require('../assets/images/sport_news2_bball.png'),  
    content: `Luka Doncic had 33 points, 11 rebounds and eight assists, Austin Reaves added 28 points, and the Los Angeles Lakers snapped a four-game losing streak with a 107-96 win over the visiting Phoenix Suns on Sunday (Monday, March 17, Manila time).

Jaxson Hayes matched his season high with 19 points and Dorian Finney-Smith added 10 for the Lakers (41-25), who led by as many as 20 and held the Suns to 39.3 percent shooting, including 9 of 41 (22 percent) from 3-point range.

Playing without injured starters LeBron James and Rui Hachimura, the Lakers shot 43.2 percent from the field and 35.9 percent (14 of 39) from beyond the arc.

Kevin Durant led Phoenix (31-37) with 21 points and nine rebounds. Devin Booker scored 19 points, Ryan Dunn had 13, Nick Richards added 11, and Royce O’Neale chipped in 10. The Suns have lost three of their last four games.

Los Angeles trailed 9-8 in the early minutes before going on a 23-2 run to move ahead 31-11 with 1:21 left in the first quarter. Doncic scored 13 straight points during the run.

Phoenix trailed 31-15 at the end of the opening period and 54-37 at the half.

Doncic and Reaves combined for 30 points in the first half for the Lakers, who limited the Suns to 36.4 percent shooting for the half, including 2 of 18 (11.1 percent) from 3-point range. `,
 
  },
];


const SportScreen = () => {
  const renderNewsItem = ({ item }) => (
    <NewsCard
      item={item}  
    />
  );

  return (
    <View style={styles.screen}>
       <View style={styles.titleContainer}>
           <View style={styles.titleIndicator} />
           <Text style={styles.titleText}>Sport</Text>
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

export default SportScreen;