import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from 'screens/Explore/HomeScreen';
import ViewAllScreen from 'screens/Explore/ViewAllScreen';
import ProductDetailScreen from 'screens/Explore/ProductDetailsScreen';
import AddToWatchlistModal from 'screens/Explore/AddToWatchlistModal';
import { HomeStackParamList } from './navigation-types';



const Stack = createNativeStackNavigator<HomeStackParamList>();


export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ViewAll" component={ViewAllScreen} />
    </Stack.Navigator>
  );
}