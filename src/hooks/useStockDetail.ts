import { useEffect, useState, useCallback } from 'react';
import stockService, {
  CompanyOverview,
  IntradayDataPoint,
} from 'services/stockService';

type StockDetailState = {
  overview: CompanyOverview | null;
  chartData: IntradayDataPoint[] | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
};

export default function useStockDetail(symbol: string): StockDetailState {
  const [overview, setOverview] = useState<CompanyOverview | null>(null);
  const [chartData, setChartData] = useState<IntradayDataPoint[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [overviewRes, chartRes] = await Promise.all([
        stockService.getStockOverview(symbol),
        stockService.getIntradayData(symbol),
      ]);

      setOverview(overviewRes);
      setChartData(chartRes);
    } catch (err: any) {
      console.error('Error in useStockDetail:', err.message);
      setError(err.message ?? 'Failed to load stock details');
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    overview,
    chartData,
    loading,
    error,
    refresh: fetchAll,
  };
}
