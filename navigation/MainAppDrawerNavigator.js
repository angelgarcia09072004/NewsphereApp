// navigation/MainAppDrawerNavigator.js
// --- THIS IS YOUR FULL ORIGINAL CODE ---
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import CustomDrawerContent from '../components/CustomDrawerContent';
import AppHeader from '../components/AppHeader'; // We will test this next
import Colors from '../constants/Colors';

import HotTrendingsScreen from '../screens/HotTrendingsScreen';
import InternationalScreen from '../screens/InternationalScreen';
import SportsScreen from '../screens/SportsScreen';
import BusinessScreen from '../screens/BusinessScreen';
import EntertainmentScreen from '../screens/EntertainmentScreen';
import WeatherScreen from '../screens/WeatherScreen';
import AboutScreen from '../screens/AboutScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarActiveTintColor: Colors.primary || '#1A364B',
        tabBarInactiveTintColor: Colors.darkGrey || '#A9B4BE',
        tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 0.5 },
        tabBarStyle: { backgroundColor: Colors.white || '#FFFFFF' },
        tabBarIndicatorStyle: { backgroundColor: Colors.primary || '#1A364B', height: 3 },
        tabBarItemStyle: { width: 'auto', paddingHorizontal: 16, paddingVertical: 10 },
        tabBarPressColor: Colors.lightGrey || '#f0f0f0',
      }}
    >
      <Tab.Screen name="Hot Trendings" component={HotTrendingsScreen} />
      <Tab.Screen name="International" component={InternationalScreen} />
      <Tab.Screen name="Sports" component={SportsScreen} />
      <Tab.Screen name="Business" component={BusinessScreen} />
      <Tab.Screen name="Entertainment" component={EntertainmentScreen} />
      <Tab.Screen name="Weather" component={WeatherScreen} />
    </Tab.Navigator>
  );
}

function ScreenWithHeader({ route, component: Component }) {
    return (
        <Stack.Navigator
           screenOptions={{
              headerStyle: { backgroundColor: Colors.primary },
              headerTintColor: Colors.white,
              headerTitleStyle: { fontWeight: 'bold' },
              headerBackTitleVisible: false,
           }}
        >
            <Stack.Screen
               name={route.name + "Stack"}
               component={Component}
               options={{ header: (props) => <AppHeader {...props} title="NEWSPHERE" /> }} // Original custom header
            />
            <Stack.Screen
                name="ArticleDetail"
                component={ArticleDetailScreen}
                options={({ route }) => ({
                    title: route.params?.articleTitle || 'Article',
                })}
            />
        </Stack.Navigator>
    );
}

const MainAppDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: Colors.secondary || '#FF6F61',
        drawerInactiveTintColor: Colors.grey || '#888888',
        drawerActiveTintColor: Colors.white || '#FFFFFF',
        drawerLabelStyle: { marginLeft: 0, fontSize: 15, fontWeight: '500' }
      }}
    >
       <Drawer.Screen name="Home" options={{ title: 'NEWSPHERE Home' }}>
         {(props) => <ScreenWithHeader {...props} route={props.route} component={HomeTabs} />}
      </Drawer.Screen>
      <Drawer.Screen name="Hot Trendings">
         {(props) => <ScreenWithHeader {...props} route={props.route} component={HomeTabs} />}
      </Drawer.Screen>
      <Drawer.Screen name="International">
        {(props) => <ScreenWithHeader {...props} route={props.route} component={InternationalScreen} />}
      </Drawer.Screen>
       <Drawer.Screen name="Sports">
         {(props) => <ScreenWithHeader {...props} route={props.route} component={SportsScreen} />}
      </Drawer.Screen>
      <Drawer.Screen name="Business">
         {(props) => <ScreenWithHeader {...props} route={props.route} component={BusinessScreen} />}
      </Drawer.Screen>
      <Drawer.Screen name="Entertainment">
         {(props) => <ScreenWithHeader {...props} route={props.route} component={EntertainmentScreen} />}
      </Drawer.Screen>
      <Drawer.Screen name="Weather">
         {(props) => <ScreenWithHeader {...props} route={props.route} component={WeatherScreen} />}
      </Drawer.Screen>
      <Drawer.Screen name="About">
         {(props) => <ScreenWithHeader {...props} route={props.route} component={AboutScreen} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default MainAppDrawerNavigator;