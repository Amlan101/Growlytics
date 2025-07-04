import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import useTopGainers from 'hooks/useTopGainers';
import useTopLosers from 'hooks/useTopLosers';
import StockCard from 'components/StockCard';
import { HomeStackParamList, RootStackParamList } from 'navigation/navigation-types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RouteParams = RouteProp<HomeStackParamList, 'ViewAll'>;

export default function ViewAllScreen() {
  const route = useRoute<RouteParams>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isGainers = route.params.type === 'gainers';

  useLayoutEffect(() => {
    navigation.setOptions({title: route.params.title})
  }, [navigation, route.params.title]);

  const {
    data: gainers,
    loading: loadingGainers,
    error: errorGainers,
  } = useTopGainers();
  const {
    data: losers,
    loading: loadingLosers,
    error: errorLosers,
  } = useTopLosers();

  const data = isGainers ? gainers : losers;
  const isLoading = isGainers ? loadingGainers : loadingLosers;
  const isError = isGainers ? errorGainers : errorLosers;

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Failed to load stocks.</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={data}
      keyExtractor={(item) => item.symbol}
      renderItem={({ item }) => (
        <StockCard
          symbol={item.symbol}
          onPress={() =>
            navigation.navigate('ProductDetail', { symbol: item.symbol })
          }
        />
      )}
      numColumns={2}
      columnWrapperStyle={styles.row}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16 },
  row: { justifyContent: 'space-between', marginBottom: 12 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: { color: 'red', fontSize: 16 },
});


