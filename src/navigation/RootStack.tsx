import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import ProductDetailScreen from 'screens/Explore/ProductDetailsScreen';
import AddToWatchlistModal from 'screens/Explore/AddToWatchlistModal';
import { RootStackParamList } from './navigation-types';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen
        name="AddToWatchlist"
        component={AddToWatchlistModal}
        options={{ presentation: 'modal', title: 'Add to Watchlist' }}
      />
    </Stack.Navigator>
  );
}