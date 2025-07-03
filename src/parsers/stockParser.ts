import { CompanyOverview, IntradayDataPoint, StockSummary, RawStockItem } from '../models/Stock';

export const parseOverview = (raw: any): CompanyOverview => ({
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

export const parseIntradayData = (raw: any): IntradayDataPoint[] => {
  const timeSeries = raw['Time Series (5min)'] ?? {};
  const entries = Object.entries(timeSeries);

  return entries.map(([timestamp, data]: any) => ({
    timestamp,
    close: parseFloat(data['4. close']),
  })).reverse(); 
};

export const parseRawStock = (raw: RawStockItem): StockSummary => ({
  symbol: raw.ticker,
  price: parseFloat(raw.price),
  changeAmount: parseFloat(raw.change_amount),
  changePercentage: parseFloat(raw.change_percentage.replace('%', '')),
  volume: parseInt(raw.volume, 10),
});
