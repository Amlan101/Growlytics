import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from 'screens/Explore/HomeScreen';
import ViewAllScreen from 'screens/Explore/ViewAllScreen';
import ProductDetailScreen from 'screens/Explore/ProductDetailsScreen';
import AddToWatchlistModal from 'screens/Explore/AddToWatchlistModal';


const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ViewAll" component={ViewAllScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen
        name="AddToWatchlist"
        component={AddToWatchlistModal}
        options={{ presentation: 'modal', title: 'Add to Watchlist' }}
      />
    </Stack.Navigator>
  );
}