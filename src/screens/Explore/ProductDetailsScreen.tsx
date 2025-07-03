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
import { IntradayDataPoint } from 'models/Stock';
import { HomeStackParamList } from 'navigation/navigation-types';

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

  const priceStart = chartData?.[0]?.close ?? 0;
  const priceEnd = chartData?.at(-1)?.close ?? 0;

  const change = priceEnd - priceStart;
  const changePct = priceStart !== 0 ? (change / priceStart) * 100 : 0;

  const formattedChange = `${change >= 0 ? '+' : ''}${changePct.toFixed(2)}%`;
  const isGain = change >= 0;


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

      <View style={styles.headerInfo}>
        <Text style={styles.ticker}>{overview.symbol}</Text>
        <Text style={styles.price}>${chartData?.at(-1)?.close.toFixed(2) ?? '--'}</Text>
        <Text style={[styles.change, { color: isGain ? 'green' : 'red' }]}>
        {formattedChange}
        </Text>
      </View>

{chartData && chartData.length > 0 ? (
  <LineChart
    data={{
      labels: chartData.map((point: IntradayDataPoint, index: number) =>
        index % Math.floor(chartData.length / 6) === 0
          ? point.timestamp.split(' ')[1].slice(0, 5)
          : ''
      ),
      datasets: [
        {
          data: chartData.map((point) => point.close),
        },
      ],
    }}
    width={Dimensions.get('window').width - 32} // padding-safe width
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
        <Text>52W Low: ${overview.week52Low}</Text>
        <Text>52W High: ${overview.week52High}</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Market Cap</Text>
          <Text>${(overview.marketCap / 1e12).toFixed(2)}T</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>P/E Ratio</Text>
          <Text>{overview.peRatio.toFixed(2)}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Dividend Yield</Text>
          <Text>{(overview.dividendYield * 100).toFixed(2)}%</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Profit Margin</Text>
          <Text>{(overview.profitMargin * 100).toFixed(2)}%</Text>
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