import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Button,
  Dimensions,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import useStockDetail from 'hooks/useStockDetail';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LineChart } from 'react-native-chart-kit';
import { RootStackParamList } from 'navigation/navigation-types';
import { calculatePriceChange } from 'utils/priceCalculations';
import { formatCurrency, formatMarketCap, formatPercentage, formatRatio, formatPrice } from 'utils/formatters';
import { transformChartData } from 'utils/chartHelpers';
import { useLayoutEffect } from 'react'; 
import { MaterialIcons } from '@expo/vector-icons';
import useWatchlist from 'hooks/useWatchlist';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;

export default function ProductDetailScreen({ route, navigation }: Props) {
  const { symbol } = route.params;
  const { overview, chartData, loading, error, refresh } = useStockDetail(symbol);
  const { watchlist } = useWatchlist();

  const isInWatchlist = watchlist.some(item => item.symbol === symbol);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddToWatchlist', { symbol })}
        >
          <MaterialIcons
            name={isInWatchlist ? 'bookmark' : 'bookmark-border'}
            size={24}
            color="#6200ee"
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, symbol, isInWatchlist]);


  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  if (error || !overview) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Failed to load stock data.</Text>
        <Button title="Retry" onPress={refresh} />
      </View>
    );
  }

  const priceData = calculatePriceChange(chartData);
  const chartTransformedData = transformChartData(chartData);

  let latestPriceText = '$291.00'; 
  const latest = chartData?.at?.(-1);
  if (Array.isArray(chartData) && chartData.length > 0 && typeof latest?.close === 'number') {
    latestPriceText = `$${latest.close.toFixed(2)}`;
  } else {
    console.warn('⚠️ chartData has malformed or missing close value:', latest);
  }

  return (
    <ScrollView>
<View style={[styles.overviewRow, { paddingHorizontal: 16, paddingTop: 16 }]}>
  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
    {/* Circular icon with first letter */}
    <View
      style={{
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f5f6fa', 
        borderWidth: 1,
        borderColor: '#d1d5db', 
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#111' }}>
        {overview.name?.charAt(0) || ''}
      </Text>
    </View>
    <View style={styles.leftBlock}>
      <Text style={[styles.symbolName, { fontSize: 14 }]}>
        {overview.name}
      </Text>
      <Text style={[styles.symbolMeta, { fontSize: 12 }]}>
        {overview.symbol}, {overview.exchange}
      </Text>
    </View>
  </View>
  <View style={styles.rightBlock}>
    <Text style={styles.priceLarge}>{latestPriceText}</Text>
    <Text style={[styles.percentageChange, { color: priceData.isGain ? '#00b386' : '#ff3b30' }]}>
      {priceData.formattedChange}
    </Text>
  </View>
</View>

{chartData && chartData.length > 0 && chartTransformedData ? (
  <View style={{ marginHorizontal: 16 }}>
    <LineChart
      data={chartTransformedData}
      width={Dimensions.get('window').width - 32}
      height={220}
      yAxisLabel="$"
      withVerticalLines={false}
      withDots={false}
      chartConfig={{
        backgroundColor: '#fff',
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        labelColor: () => '#999',
        propsForBackgroundLines: {
          stroke: '#eee',
        },
      }}
      bezier
      style={styles.chart}
    />
  </View>
) : (
  <Text style={styles.chartPlaceholder}>No chart data available</Text>
)}


{/* About */}
<View style={styles.card}>
  <Text style={styles.cardTitle}>About {overview.name}</Text>
  <Text style={styles.description}>{overview.description}</Text>

  <View style={styles.badgeContainer}>
    <Text style={[styles.badge, { backgroundColor: '#fde8e8', color: '#a30000' }]}>
      Industry: {overview.industry}
    </Text>
    <Text style={[styles.badge, { backgroundColor: '#fde8e8', color: '#a30000' }]}>
      Sector: {overview.sector}
    </Text>
  </View>

  {/* Price Range Row */}
  <View style={styles.priceRangeRow}>
    <Text style={styles.statLabel}>52-Week Low</Text>
    <Text style={styles.priceNowLabel}>Current: {latestPriceText}</Text>
    <Text style={styles.statLabel}>52-Week High</Text>
  </View>
  <View style={styles.priceRangeRow}>
    <Text style={styles.statValue}>{formatCurrency(overview.week52Low)}</Text>
    <Text style={styles.statValue}>⇵</Text>
    <Text style={styles.statValue}>{formatCurrency(overview.week52High)}</Text>
  </View>

  {/* Row stats at the bottom of the card */}
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text style={styles.statLabel}>Market Cap</Text>
      <Text style={styles.statValue}>{formatMarketCap(overview.marketCap)}</Text>
    </View>
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text style={styles.statLabel}>P/E Ratio</Text>
      <Text style={styles.statValue}>{formatRatio(overview.peRatio)}</Text>
    </View>
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text style={styles.statLabel}>Dividend Yield</Text>
      <Text style={styles.statValue}>{formatPercentage(overview.dividendYield)}</Text>
    </View>
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text style={styles.statLabel}>Profit Margin</Text>
      <Text style={styles.statValue}>{formatPercentage(overview.profitMargin)}</Text>
    </View>
  </View>
</View>
</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 64,
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
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  stat: {
    width: '47%',
    marginBottom: 12,
  },
  statLabel: {
    fontWeight: '600',
    fontSize: 12,
    color: '#666',
  },
  headerInfo: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
},
ticker: {
  fontSize: 18,
  fontWeight: '600',
},
price: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#333',
},
change: {
  fontSize: 16,
  fontWeight: '500',
},
overviewRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 16,
},
leftBlock: {
  flex: 1,
},
rightBlock: {
  alignItems: 'flex-end',
},
symbolName: {
  fontSize: 22,
  fontWeight: '700',
  color: '#000',
},
symbolMeta: {
  fontSize: 14,
  color: '#666',
  marginTop: 4,
},
priceLarge: {
  fontSize: 20,
  fontWeight: '600',
  color: '#111',
},
percentageChange: {
  fontSize: 14,
  marginTop: 4,
},
chart: {
  borderRadius: 12,
  marginBottom: 24,
},
chartPlaceholder: {
  fontSize: 14,
  color: '#999',
  textAlign: 'center',
  marginVertical: 16,
},
card: {
  backgroundColor: 'white',
  padding: 16,
  borderRadius: 12,
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 2,
  marginBottom: 24,
},
cardTitle: {
  fontSize: 16,
  fontWeight: '600',
  marginBottom: 12,
},
badgeContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 8,
  marginTop: 12,
  marginBottom: 16,
},
badge: {
  backgroundColor: '#f0f2f5',
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 16,
  fontSize: 12,
  marginRight: 8,
},
priceRangeRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 8,
},
priceNowLabel: {
  fontSize: 12,
  color: '#999',
},
statValue: {
  fontSize: 14,
  fontWeight: '600',
  color: '#111',
},
});