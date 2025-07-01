import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type RouteParams = {
  name: string;
};

export default function WatchlistStocksScreen() {
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const { name } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Stocks in {name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: 'bold' },
});