import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import WatchlistStack from './WatchlistStack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#6200ee',
          tabBarInactiveTintColor: '#999',
        }}
      >
        <Tab.Screen
          name="Explore"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="compass-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Watchlist"
          component={WatchlistStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="bookmark-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
  );
}

