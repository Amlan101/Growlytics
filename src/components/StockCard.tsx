import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const CARD_SIZE = (Dimensions.get('window').width - 48) / 2;


export default function StockCard({
  symbol,
  price = 0,
  onPress,
}: {
  symbol: string;
  price?: number;
  onPress: () => void;
}) {
  const initial = symbol?.charAt(0).toUpperCase() || '?';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconCircle}>
        <Text style={styles.iconText}>{initial}</Text>
      </View>
      <Text style={styles.symbol}>{symbol}</Text>
      <Text style={styles.price}>₹{price.toFixed(2)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#6200ee22',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  iconText: {
    color: '#6200ee',
    fontWeight: 'bold',
    fontSize: 16,
  },
  symbol: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
});