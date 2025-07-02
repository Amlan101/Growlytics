import apiClient from 'services/apiClient';

export type StockSummary = {
  symbol: string;
  price: number;
  changeAmount: number;
  changePercentage: number;
  volume: number;
};

type RawStockItem = {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
  volume: string;
};

const parseRawStock = (raw: RawStockItem): StockSummary => ({
  symbol: raw.ticker,
  price: parseFloat(raw.price),
  changeAmount: parseFloat(raw.change_amount),
  changePercentage: parseFloat(raw.change_percentage.replace('%', '')),
  volume: parseInt(raw.volume, 10),
});

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
};

export default stockService;