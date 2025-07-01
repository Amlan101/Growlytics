import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from 'screens/Explore/HomeScreen';
import WatchlistScreen from 'screens/Watchlist/WatchlistScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#6200ee',
          tabBarInactiveTintColor: '#999',
        }}
      >
        <Tab.Screen
          name="Explore"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="compass-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Watchlist"
          component={WatchlistScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="bookmark-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

