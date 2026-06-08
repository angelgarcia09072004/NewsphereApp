import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import NewsCard from '../components/NewsCard'; 
import Colors from '../constants/Colors'; 

// --- Function to create recent dates easily ---
const getRecentDate = (hoursAgo) => {
  const date = new Date();
  date.setHours(date.getHours() - hoursAgo);
  return date.toISOString();
};

const businessNewsData = [
  {
    id: 'business_1',
    title: 'BPI earnings rose to P16.6B in Q1; banner year ahead',  
    source: { name: 'BanksLip' },  
    date: getRecentDate(20),         
    image: require('../assets/images/business_news1_bball.png'),  
    description: 'Bank of the Philippine Islands reports strong first-quarter performance, driven by robust loan growth and higher net interest income.', 
    content: `MANILA, Philippines – Bank of the Philippine Islands (BPI) kicked off 2024 with a strong financial performance, reporting a 25.8% increase in net income to P16.6 billion for the first quarter compared to the same period last year.

This growth was primarily driven by record revenues which reached P42.6 billion, up 26.1% year-on-year. The bank attributed this performance to higher net interest income, which grew 25.0% to P31.8 billion, coupled with a 28.7% rise in non-interest income reaching P10.8 billion.

"We are pleased with our strong start to the year," said BPI President and CEO TG Limcaoco in a statement. "Our focus remains on executing our strategic priorities, including digitalization and sustainable financing, to deliver value to our customers and stakeholders."

Analysts predict a banner year for BPI, citing the positive economic outlook and the bank's solid fundamentals.`,
 
  },
  {
    id: 'business_2',
    title: 'Central Bank Holds Interest Rates Steady Amid Inflation Concerns',  
    source: { name: 'Financial Times PH' },  
    date: getRecentDate(48),  
    image: require('../assets/images/business_news2_bball.png'),  
    description: 'The Monetary Board decided to maintain the key policy interest rate at its current level during its latest meeting.',   
    content: `MANILA – The Bangko Sentral ng Pilipinas (BSP) kept its benchmark interest rate unchanged at 6.5% for the fourth consecutive policy meeting, citing persistent inflationary pressures balanced against risks to economic growth.

The Monetary Board's decision was widely expected by economists, as inflation, while easing slightly in recent months, remains above the government's target range. The BSP reiterated its commitment to bringing inflation back within the 2-4% target band.

"The Monetary Board deems it appropriate to maintain monetary policy settings for now," BSP Governor Eli Remolona Jr. said in a statement. "While inflation risks remain tilted to the upside, the BSP also recognizes the need to support economic activity."

The central bank will continue to monitor domestic and global economic developments closely to determine future policy actions.`, 
    url: 'https://www.example.com/bsp-rate-decision-may2024',  
  },
];


// --- BusinessScreen Component ---
const BusinessScreen = () => {

  const renderNewsItem = ({ item }) => (
    <NewsCard
      item={item}
    />
  );

  return (
    <View style={styles.screen}>
       <View style={styles.titleContainer}>
           <View style={styles.titleIndicator} />
           <Text style={styles.titleText}>Business</Text>
       </View>
      <FlatList
        data={businessNewsData}  
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// --- Styles (Consistent with other screens) ---
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

export default BusinessScreen;