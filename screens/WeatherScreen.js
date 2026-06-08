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
    title: 'Philippines’ 2025 warm and dry season underway',  
    source: { name: 'WeatherWeatherLang' },
    date: getRecentDate(2),  
    image: require('../assets/images/weather_news1.png'), 
    description: 'The day-to-day weather across the country will gradually become warmer, though isolated thunderstorms are also likely to occur,’ says PAGASA',
    content: `MANILA, Philippines – Expect hotter days ahead as the Philippines’ warm and dry season has begun.

In a statement on Wednesday, March 26, the Philippine Atmospheric, Geophysical, and Astronomical Services Administration (PAGASA) announced the start of the warm and dry season, which Filipinos often call “summer.”

The start of the warm and dry season means the cool and dry season, which is characterized by the northeast monsoon or amihan, has ended.

“The shift of wind direction from northeasterly to easterly due to the establishment of the high pressure area over the northwestern Pacific signifies the termination of the northeast monsoon over most parts of the country and the start of the dry season,” PAGASA said.

“However, extreme Northern Luzon may still experience occasional northeasterly winds,” added the weather bureau.

The northeast monsoon affected parts of the country from November 2024 to March 2025. Its onset in 2024 was delayed, since it usually begins every October.

The warm and dry season typically lasts until May. Temperatures are expected to rise during this period, with PAGASA issuing daily heat index forecasts and recorded figures.`,
 
  },
  {
    id: 'newscard2',
    title: 'PAGASA launches Japan-funded Cagayan de Oro River flood warning system',
    source: { name: 'PAGASA' },
    date: getRecentDate(5),  
    image: require('../assets/images/weather_news2.png'),  
    description: `Accurate, timely, and relevant' flood advisories for communities along the Cagayan de Oro River Basin are expected following the inauguration of a 'state-of-the-art' monitoring network`,
    content: `MISAMIS ORIENTAL, Philippines – The Philippine weather bureau on Friday, April 4, inaugurated its Cagayan de Oro River Basin Flood Forecasting and Warning System, which aims to boost disaster preparedness in the provinces of Misamis Oriental and Bukidnon.

This new system of the Philippine Atmospheric, Geophysical, and Astronomical Services Administration (PAGASA) was funded through a Japan International Cooperation Agency grant of 930 million yen — around P362 million or $6.4 million at current exchange rates.

The Philippines and Japan signed the grant agreement in June 2018, but civil works only began in March 2023 due to delays caused by the COVID-19 pandemic. The project’s operational phase began in June 2024, while training for system operation and maintenance was conducted in early 2025.

The project involved the “installation of a state-of-the-art network of telemetered rainfall and water level monitoring gauges, X-Band radar stations, a dedicated data transmission backbone, and a 24/7 operations center.`,
  },
  {
    id: 'newscard3',
    title: 'LIST: Philippine tropical cyclone names in 2025',
    source: { name: 'UPWEATHER' },
    date: getRecentDate(25),  
    image: require('../assets/images/weather_news3.png'),  
    description: `Auring, Fabian, Kiko, and Paolo are some of the local tropical cyclone names in PAGASA's 2025 list `,
    content: `MANILA, Philippines – All tropical cyclones that form within or enter the Philippine Area of Responsibility (PAR) are given local names.

The Philippine Atmospheric, Geophysical, and Astronomical Services Administration (PAGASA) alternately uses four regular sets of local names. Each regular set has 25 names, arranged alphabetically.

There is also a corresponding auxiliary set for each regular set, with 10 names each, in case there are more than 25 tropical cyclones in a particular year.
The sets above will also be used in 2029, 2033, 2037, and so on, except for names that PAGASA will be retiring.

When a tropical cyclone causes at least 300 deaths and/or P1 billion worth of damage to agriculture and infrastructure, its name will be retired. The retired name will then be replaced by another name starting with the same letter. For the 2025 set, the new names are Jacinto, Mirasol, and Opong. They replaced 2021’s Typhoon Jolina (Conson), Severe Tropical Storm Maring (Kompasu), and Typhoon Odette (Rai), respectively.
`,
  },
];

const WeatherScreen = () => {
  const renderNewsItem = ({ item }) => (
    <NewsCard
      item={item}  
    />
  );

  return (
    <View style={styles.screen}>
       <View style={styles.titleContainer}>
           <View style={styles.titleIndicator} />
           <Text style={styles.titleText}>Weather</Text>
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

export default WeatherScreen;