import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Button,
  Dimensions,
  RefreshControl
} from 'react-native';
import useStockDetail from 'hooks/useStockDetail';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LineChart } from 'react-native-chart-kit';
import { HomeStackParamList } from 'navigation/navigation-types';
import { calculatePriceChange } from 'utils/priceCalculations';
import { formatCurrency, formatMarketCap, formatPercentage, formatRatio, formatPrice } from 'utils/formatters';
import { transformChartData } from 'utils/chartHelpers';

type Props = NativeStackScreenProps<HomeStackParamList, 'ProductDetail'>;

export default function ProductDetailScreen({ route, navigation }: Props) {
  const { symbol } = route.params;
  const { overview, chartData, loading, error, refresh } = useStockDetail(symbol);

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
    <ScrollView 
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refresh} />
      }
    >
      <Text style={styles.name}>{overview.name}</Text>
      <Text style={styles.subheading}>
        {overview.symbol}, {overview.exchange}
      </Text>

      <Text style={styles.section}>Price Chart (Intraday)</Text>
      <Text style={styles.price}>{latestPriceText}</Text>
      <View style={styles.headerInfo}>
        <Text style={styles.ticker}>{overview.symbol}</Text>
        <Text style={styles.price}>
          
        </Text>
      </View>

{chartData && chartData.length > 0 && chartTransformedData ? (
  <LineChart
    data={chartTransformedData}
    width={Dimensions.get('window').width - 32}
    height={220}
    yAxisLabel="$"
    withVerticalLines={false}
    withDots={false}
    chartConfig={{
      backgroundColor: '#ffffff',
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#ffffff',
      decimalPlaces: 2,
      color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      style: {
        borderRadius: 12,
      },
      propsForBackgroundLines: {
        stroke: '#eee',
      },
    }}
    bezier
    style={{
      marginVertical: 16,
      borderRadius: 12,
    }}
  />
) : (
  <Text style={{ color: '#888', fontSize: 14 }}>No chart data available.</Text>
)}


      <Text style={styles.section}>About {overview.name}</Text>
      <Text style={styles.description}>{overview.description}</Text>

      <View style={styles.badges}>
        <Text style={styles.badge}>Sector: {overview.sector}</Text>
        <Text style={styles.badge}>Industry: {overview.industry}</Text>
      </View>

      <View style={styles.statsRow}>
        <Text>52W Low: {formatCurrency(overview.week52Low)}</Text>
        <Text>52W High: {formatCurrency(overview.week52High)}</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Market Cap</Text>
          <Text>{formatMarketCap(overview.marketCap)}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>P/E Ratio</Text>
          <Text>{formatRatio(overview.peRatio)}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Dividend Yield</Text>
          <Text>{formatPercentage(overview.dividendYield)}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Profit Margin</Text>
          <Text>{formatPercentage(overview.profitMargin)}</Text>
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
  badge: {
    backgroundColor: '#EEE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 12,
    marginRight: 8,
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
});