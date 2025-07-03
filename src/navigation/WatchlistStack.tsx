import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WatchlistScreen from 'screens/Watchlist/WatchlistScreen';

const Stack = createNativeStackNavigator();

export default function WatchlistStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Watchlists" component={WatchlistScreen} />
    </Stack.Navigator>
  );
}
