import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { StockSummary } from 'models/Stock';
import stockService from 'services/stockService';
import useWatchlist from 'hooks/useWatchlist';
import { useNavigation } from '@react-navigation/native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/navigation-types';


export default function AddToWatchlistModal() {
  const route = useRoute<RouteProp<RootStackParamList, 'AddToWatchlist'>>();
  const initialSymbol = route.params?.symbol || '';
  const [symbol, setSymbol] = useState(initialSymbol);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { add } = useWatchlist();
  const navigation = useNavigation();

  const handleAdd = async () => {
    setLoading(true);
    setError(null);
    try {
      const overview = await stockService.getStockOverview(symbol.trim().toUpperCase());

      if (!overview || !overview.symbol || !overview.name) {
        setError('Invalid symbol or data not found');
        return;
      }

      const summary: StockSummary = {
        symbol: overview.symbol,
        price: overview.peRatio || 0, 
        changeAmount: 0, 
        changePercentage: 0, 
        volume: 0, 
      };

      await add(summary);
      navigation.goBack();
    } catch (e: any) {
      setError('Failed to add stock. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Stock to Watchlist</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Ticker Symbol (e.g. AAPL)"
        value={symbol}
        onChangeText={setSymbol}
        autoCapitalize="characters"
      />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Add" onPress={handleAdd} disabled={!symbol.trim()} />
      )}

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    marginTop: 64,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  error: {
    marginTop: 16,
    color: 'red',
  },
});
