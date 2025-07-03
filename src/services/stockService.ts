import apiClient from 'services/apiClient';
import { CompanyOverview, IntradayDataPoint, RawStockItem, StockSummary } from 'models/Stock';
import { parseOverview, parseIntradayData, parseRawStock } from 'parsers/stockParser';


const stockService = {
  getTopGainers: async (): Promise<StockSummary[]> => {
    const response = await apiClient.get('', {
      params: {
        function: 'TOP_GAINERS_LOSERS',
      },
    });

    const rawGainers: RawStockItem[] = response.data.top_gainers;
    return rawGainers.map(parseRawStock);
  },

  getTopLosers: async (): Promise<StockSummary[]> => {
    const response = await apiClient.get('', {
      params: {
        function: 'TOP_GAINERS_LOSERS',
      },
    });

    const rawLosers: RawStockItem[] = response.data.top_losers;
    return rawLosers.map(parseRawStock);
  },

  getStockOverview: async (symbol: string): Promise<CompanyOverview> => {
  const response = await apiClient.get('', {
    params: {
      function: 'OVERVIEW',
      symbol,
    },
  });

  return parseOverview(response.data);
},

getIntradayData: async (symbol: string): Promise<IntradayDataPoint[]> => {
  const response = await apiClient.get('', {
    params: {
      function: 'TIME_SERIES_INTRADAY',
      symbol,
      interval: '5min',
      outputsize: 'compact',
    },
  });

  return parseIntradayData(response.data);
},

};

export default stockService;