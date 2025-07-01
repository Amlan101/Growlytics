import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WatchlistScreen from 'screens/Watchlist/WatchlistScreen';
import WatchlistStocksScreen from 'screens/Watchlist/WatchlistStocksScreen';

const Stack = createNativeStackNavigator();

export default function WatchlistStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Watchlists" component={WatchlistScreen} />
      <Stack.Screen name="WatchlistStocks" component={WatchlistStocksScreen} />
    </Stack.Navigator>
  );
}
