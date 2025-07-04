import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import useWatchlist from 'hooks/useWatchlist';
import { Swipeable } from 'react-native-gesture-handler';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StockSummary } from 'models/Stock';
import StockCard from 'components/StockCard'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList, RootStackParamList } from 'navigation/navigation-types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;

export default function WatchlistScreen() {
  const { watchlist, loading, error, remove, refresh } = useWatchlist();
  const navigation = useNavigation<NavigationProp>();

  const handleDelete = (symbol: string) => {
    Alert.alert(
      'Remove Stock',
      `Are you sure you want to remove ${symbol} from your watchlist?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => remove(symbol) },
      ]
    );
  };


  const renderRightActions = (symbol: string) => (
    <RectButton style={styles.deleteButton} onPress={() => handleDelete(symbol)}>
      <Text style={styles.deleteText}>Remove</Text>
    </RectButton>
  );

  const renderItem = ({ item }: { item: StockSummary }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.symbol)}>
      <StockCard
        symbol={item.symbol}
        onPress={() =>
          navigation.navigate('ProductDetail', { symbol: item.symbol })
        }
      />
    </Swipeable>
  );

    if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Failed to load watchlist</Text>
      </View>
    );
  }

  if (watchlist.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>Your watchlist is empty</Text>
      </View>
    );
  }

  return (
    <FlatList
  data={watchlist}
  renderItem={({ item }) => (
    <StockCard
      symbol={item.symbol}
      price={item.price}
      onPress={() =>
        navigation.navigate('ProductDetail', { symbol: item.symbol })
      }
    />
  )}
  keyExtractor={(item) => item.symbol}
  numColumns={2}
  contentContainerStyle={styles.list}
  refreshControl={
    <RefreshControl refreshing={loading} onRefresh={refresh} />
  }
/>




  );

}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    fontSize: 16,
    color: '#777',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    flex: 1,
  },
  deleteText: {
    color: 'white',
    fontWeight: '600',
  },
});