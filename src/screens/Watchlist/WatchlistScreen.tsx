import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any>;

export default function WatchlistScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('WatchlistStocks', { name: 'Watchlist 1' })}>
        <Text style={styles.item}>Watchlist 1</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('WatchlistStocks', { name: 'Watchlist 2' })}>
        <Text style={styles.item}>Watchlist 2</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  item: {
    fontSize: 18,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
