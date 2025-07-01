import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import StockCard from 'components/StockCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <StockCard symbol="AAPL" onPress={() => navigation.navigate('ProductDetail', { symbol: 'AAPL' })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 50 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
});
