import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import useTopGainers from 'hooks/useTopGainers';
import useTopLosers from 'hooks/useTopLosers';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any>;

export default function HomeScreen({ navigation }: Props) {
  
  const { data: gainers, loading: loadingGainers, error: errorGainers, reload: reloadGainers, } = useTopGainers();
  const { data: losers, loading: loadingLosers, error: errorLosers, reload: reloadLosers, } = useTopLosers();

  const isLoading = loadingGainers || loadingLosers;
  const hasError = errorGainers || errorLosers;
  const isEmpty =
    (!gainers || gainers.length === 0) &&
    (!losers || losers.length === 0);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  if (hasError) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>
          Error loading stocks. Please try again.
        </Text>
        <Button
          title="Retry"
          onPress={() => {
            reloadGainers();
            reloadLosers();
          }}
        />
      </View>
    );
  }

  if (isEmpty) {
    return (
      <View style={styles.center}>
        <Text>No data available right now.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.list}>
      <Text style={styles.section}>Top Gainers</Text>
      {gainers?.map((item) => (
        <TouchableOpacity
          key={item.symbol}
          style={styles.card}
          onPress={() =>
            navigation.navigate('ProductDetail', { symbol: item.symbol })
          }
        >
          <Text style={styles.symbol}>{item.symbol}</Text>
          <Text>₹{item.price.toFixed(2)}</Text>
          <Text style={{ color: 'green' }}>{item.changePercentage.toFixed(2)}%</Text>
        </TouchableOpacity>

      ))}

      <Text style={styles.section}>Top Losers</Text>
      {losers?.map((item) => (
        <TouchableOpacity
          key={item.symbol}
          style={styles.card}
          onPress={() =>
            navigation.navigate('ProductDetail', { symbol: item.symbol })
          }
        >
          <Text style={styles.symbol}>{item.symbol}</Text>
          <Text>₹{item.price.toFixed(2)}</Text>
          <Text style={{ color: 'red' }}>{item.changePercentage.toFixed(2)}%</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { color: 'red', fontSize: 16, marginBottom: 12 },
  list: { padding: 16 },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  symbol: { fontSize: 18, fontWeight: 'bold' },
  section: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 16,
    color: '#333',
  },
});