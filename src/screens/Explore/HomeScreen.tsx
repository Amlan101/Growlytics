import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import useTopGainers from 'hooks/useTopGainers';
import useTopLosers from 'hooks/useTopLosers';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import StockCard from 'components/StockCard';

type Props = NativeStackScreenProps<any>;

export default function HomeScreen({ navigation }: Props) {
  const {
    data: gainers,
    loading: loadingGainers,
    error: errorGainers,
    reload: reloadGainers,
  } = useTopGainers();
  const {
    data: losers,
    loading: loadingLosers,
    error: errorLosers,
    reload: reloadLosers,
  } = useTopLosers();

  const isLoading = loadingGainers || loadingLosers;
  const hasError = errorGainers || errorLosers;
  const isEmpty =
    (!gainers || gainers.length === 0) &&
    (!losers || losers.length === 0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Growlytics',
    });
  }, [navigation]);

  const renderItem = ({ item }: any) => (
    <StockCard
      symbol={item.symbol}
      price={item.price}
      onPress={() =>
        navigation.navigate('ProductDetail', { symbol: item.symbol })
      }
    />
  );

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
        <Text style={styles.error}>Error loading stocks. Please try again.</Text>
        <Button title="Retry" onPress={() => {
          reloadGainers();
          reloadLosers();
        }} />
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.section}>Top Gainers</Text>
      <FlatList
        data={gainers?.slice(0, 4)} 
        renderItem={renderItem}
        keyExtractor={(item) => item.symbol}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
      />

      <TouchableOpacity onPress={() => navigation.navigate('ViewAll', { type: 'gainers', title: 'Top Gainers' })}>
        <Text style={styles.viewAll}>View All</Text>
      </TouchableOpacity>

      <Text style={styles.section}>Top Losers</Text>
      <FlatList
        data={losers?.slice(0, 4)}
        renderItem={renderItem}
        keyExtractor={(item) => 'loser-' + item.symbol}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
      />

      <TouchableOpacity onPress={() => navigation.navigate('ViewAll', { type: 'losers', title: 'Top Losers' })}>
        <Text style={styles.viewAll}>View All</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 12,
  },
  section: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 12,
  },
  viewAll: {
    fontSize: 14,
    color: '#6200ee',
    textAlign: 'right',
    marginBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  growlytics: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchText: {
    fontSize: 14,
    color: '#888',
  },
});



