import { IntradayDataPoint } from 'models/Stock';

export interface PriceChangeData {
  change: number;
  changePct: number;
  formattedChange: string;
  isGain: boolean;
  currentPrice: number;
}

export const calculatePriceChange = (chartData: IntradayDataPoint[] | null): PriceChangeData => {
  if (!chartData || chartData.length === 0) {
    return {
      change: 0,
      changePct: 0,
      formattedChange: '0.00%',
      isGain: false,
      currentPrice: 0,
    };
  }

  const priceStart = chartData[0]?.close ?? 0;
  const priceEnd = chartData.at(-1)?.close ?? 0;
  const change = priceEnd - priceStart;
  const changePct = priceStart !== 0 ? (change / priceStart) * 100 : 0;
  
  return {
    change,
    changePct,
    formattedChange: `${change >= 0 ? '+' : ''}${changePct.toFixed(2)}%`,
    isGain: change >= 0,
    currentPrice: priceEnd,
  };
};