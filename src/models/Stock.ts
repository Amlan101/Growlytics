export type StockSummary = {
  symbol: string;
  price: number;
  changeAmount: number;
  changePercentage: number;
  volume: number;
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

// Raw API response types
export type RawStockItem = {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
  volume: string;
};
