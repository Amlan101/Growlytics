import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Params = {
  symbol: string;
};

type Props = NativeStackScreenProps<any>;

export default function ProductDetailScreen({ navigation }: Props) {
  const route = useRoute<RouteProp<{ params: Params }, 'params'>>();
  const { symbol } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Details for {symbol}</Text>
      <Button
        title="Add to Watchlist"
        onPress={() => navigation.navigate('AddToWatchlist')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
});