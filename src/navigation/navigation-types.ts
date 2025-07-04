import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type HomeStackParamList = {
  HomeScreen: undefined;
  ViewAll: undefined;
};

export type RootStackParamList = {
  Tabs: undefined;
  ProductDetail: { symbol: string };
  AddToWatchlist: { symbol?: string };
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;