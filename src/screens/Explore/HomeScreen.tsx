import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import useTopGainers from 'hooks/useTopGainers';

export default function HomeScreen() {
  const { data, loading, error } = useTopGainers();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No gainers found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.symbol}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.symbol}>{item.symbol}</Text>
          <Text>₹{item.price.toFixed(2)}</Text>
          <Text style={{ color: item.changePercentage > 0 ? 'green' : 'red' }}>
            {item.changePercentage.toFixed(2)}%
          </Text>
        </View>
      )}
      contentContainerStyle={styles.list}
    />
  );
}
const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { color: 'red', fontSize: 16 },
  list: { padding: 16 },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  symbol: { fontSize: 18, fontWeight: 'bold' },
});
