import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default function StockCard({
  symbol,
  onPress,
}: {
  symbol: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.symbol}>{symbol}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  symbol: {
    fontSize: 18,
    fontWeight: '600',
  },
});