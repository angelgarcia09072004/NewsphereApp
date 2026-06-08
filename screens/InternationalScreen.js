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
    title: 'Pope Francis’ cause of death: stroke, coma, cardiovascular collapse',  
    source: { name: 'Sport Fest' },
    date: getRecentDate(2),  
    image: require('../assets/images/inter_news1_pope.png'),  
    description: 'The Vatican releases the medical certificate detailing Pope Francis’ cause of death on Easter Monday',
    content: `DECLARATION OF DEATH OF HIS HOLINESS FRANCIS

I hereby certify that His Holiness Francis (Jorge Mario Bergoglio) born in Buenos Aires (Argentina) on December 17, 1936, resident in Vatican City, Vatican citizen, died at 7:35 a.m. on 21/04/2025 in his apartment at the Domus Sanctae Marthae (Vatican City) from:

STROKE
COMA
IRREVERSIBLE CARDIOVASCULAR COLLAPSE
In a subject suffering from:

Previous episode of acute respiratory failure in the context of bilateral multimicrobial pneumonia
Multiple bronchiectasis
Arterial hypertension
Type II diabetes
Ascertainment of death was by electrocardio-anatomical recording.

I declare that the causes of death to the best of my knowledge and belief are as stated above.`,
 
  },
  {
    id: 'newscard2',
    title: 'NASA’s oldest, active astronaut returns to Earth on his 70th birthday',
    source: { name: 'Global News Agency' },
    date: getRecentDate(5),  
    image: require('../assets/images/inter_news2_pope.png'),  
    content: `WASHINGTON, United States – Cake, gifts and a low-key family celebration may be how many senior citizens picture their 70th birthday.

But NASA’s oldest serving astronaut Don Pettit became a septuagenarian while hurtling towards the Earth in a spacecraft to wrap up a seven-month mission aboard the International Space Station (ISS).A Soyuz capsule carrying the American and two Russian cosmonauts landed in Kazakhstan on Sunday, the day of Pettit’s milestone birthday.
READ: Katy Perry roars into space on all-women flight

“Today at 0420 Moscow time (0120 GMT), the Soyuz MS-26 landing craft with Alexei Ovchinin, Ivan Vagner and Donald (Don) Pettit aboard landed near the Kazakh town of Zhezkazgan,” Russia’s space agency Roscosmos said.

Spending 220 days in space, Pettit and his crewmates Ovchinin and Vagner orbited the Earth 3,520 times and completed a journey of 93.3 million miles over the course of their mission.

It was the fourth spaceflight for Pettit, who has logged more than 18 months in orbit throughout his 29-year career.`,
  },
  {
    id: 'newscard3',
    title: 'Harvard sues Trump over US federal funding cuts',
    source: { name: 'InWorldUpdates' },
    date: getRecentDate(25),  
    image: require('../assets/images/inter_news3_pope.png'),  
    content: `After a successful brain surgery last January, the 19-year-old Loreto is back on the basketball court, hoping to rebound from lost time with the reigning UAAP champion UST in the 2025 NBTC National Finals. 

For Loreto, returning to the team meant more than just a basketball revival; it also meant a new chapter in life

“I’m super thankful for everyone, especially God, for this second chance at life,” Loreto told Rappler in Filipino. 

“Everyone in the team allowed me this second chance. They kept strengthening my character and made me realize how important life really is.”

Loreto, who plays center for UST, did not see action in the entirety of the UAAP Season 87, where the Tiger Cubs picked up their first juniors basketball title in 24 years. 

Last January 12, Loreto was rushed to the hospital due to severe headaches and vomiting before doctors diagnosed him with pituitary macroadenoma, a tumor that affects the pituitary gland. `,
 
  },
];


const InternationalScreen = () => {
  const renderNewsItem = ({ item }) => (
    <NewsCard
      item={item}  
    />
  );

  return (
    <View style={styles.screen}>
       <View style={styles.titleContainer}>
           <View style={styles.titleIndicator} />
           <Text style={styles.titleText}>International</Text>
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

export default InternationalScreen;