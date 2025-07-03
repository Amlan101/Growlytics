import apiClient from 'services/apiClient';
import { CompanyOverview, IntradayDataPoint, RawStockItem, StockSummary } from 'models/Stock';
import { parseOverview, parseIntradayData, parseRawStock } from 'parsers/stockParser';
import { getCachedItem, setCachedItem } from "utils/cache";

const TTL = {
  gainers: 1000 * 60 * 60 * 12,       // 12 hours
  losers: 1000 * 60 * 60 * 12,        // 12 hours
  overview: 1000 * 60 * 60 * 24,      // 24 hours
  chart: 1000 * 60 * 60 * 2,          // 2 hours
};

const stockService = {
  getTopGainers: async (): Promise<StockSummary[]> => {
  const cacheKey = 'topGainers';
  const cached = await getCachedItem<StockSummary[]>(cacheKey, TTL.gainers);
  if (cached) return cached;

  const response = await apiClient.get('', {
    params: { function: 'TOP_GAINERS_LOSERS' },
  });
  const raw = response.data.top_gainers;
  const parsed = raw.map(parseRawStock);

  await setCachedItem(cacheKey, parsed);
  return parsed;
},


  getTopLosers: async (): Promise<StockSummary[]> => {
  const cacheKey = 'topLosers';
  const cached = await getCachedItem<StockSummary[]>(cacheKey, TTL.losers);
  if (cached) return cached;

  const response = await apiClient.get('', {
    params: { function: 'TOP_GAINERS_LOSERS' },
  });
  const raw = response.data.top_losers;
  const parsed = raw.map(parseRawStock);

  await setCachedItem(cacheKey, parsed);
  return parsed;
},

getStockOverview: async (symbol: string): Promise<CompanyOverview> => {
  const cacheKey = `overview_${symbol}`;
  const cached = await getCachedItem<CompanyOverview>(cacheKey, TTL.overview);
  if (cached) return cached;

  const response = await apiClient.get('', {
    params: { function: 'OVERVIEW', symbol },
  });

  const parsed = parseOverview(response.data);
  await setCachedItem(cacheKey, parsed);
  return parsed;
},

getIntradayData: async (symbol: string): Promise<IntradayDataPoint[]> => {
  const cacheKey = `chart_${symbol}`;
  const cached = await getCachedItem<IntradayDataPoint[]>(cacheKey, TTL.chart);
  if (cached && cached.length > 0) {
    console.log(`[Cache HIT] ${cacheKey} with ${cached.length} points`);
    return cached;
  } else {
    console.log(`[Cache MISS] ${cacheKey} and making API call`);
  }

  const response = await apiClient.get('', {
    params: {
      function: 'TIME_SERIES_INTRADAY',
      symbol,
      interval: '5min',
      outputsize: 'compact',
    },
  });

  const parsed = parseIntradayData(response.data);
  if(parsed.length > 0){
    await setCachedItem(cacheKey, parsed);
  } else {
    console.warn(`[Chart Data] Skipped caching empty data for ${symbol}`);
  }

  return parsed;
},

};

export default stockService;