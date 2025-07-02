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

export type CompanyOverview = {
  symbol: string;
  name: string;
  description: string;
  exchange: string;
  sector: string;
  industry: string;
  marketCap: number;
  peRatio: number;
  dividendYield: number;
  profitMargin: number;
  week52High: number;
  week52Low: number;
  website: string;
};

export type IntradayDataPoint = {
  timestamp: string;
  close: number;
};

const parseOverview = (raw: any): CompanyOverview => ({
  symbol: raw.Symbol,
  name: raw.Name,
  description: raw.Description,
  exchange: raw.Exchange,
  sector: raw.Sector,
  industry: raw.Industry,
  marketCap: parseFloat(raw.MarketCapitalization),
  peRatio: parseFloat(raw.PERatio),
  dividendYield: parseFloat(raw.DividendYield),
  profitMargin: parseFloat(raw.ProfitMargin),
  week52High: parseFloat(raw['52WeekHigh']),
  week52Low: parseFloat(raw['52WeekLow']),
  website: raw.OfficialSite,
});

const parseIntradayData = (raw: any): IntradayDataPoint[] => {
  const timeSeries = raw['Time Series (5min)'] ?? {};
  const entries = Object.entries(timeSeries);

  return entries.map(([timestamp, data]: any) => ({
    timestamp,
    close: parseFloat(data['4. close']),
  })).reverse(); 
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