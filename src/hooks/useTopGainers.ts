import { useEffect, useState } from 'react';
import stockService, { StockSummary } from 'services/stockService';

export default function useTopGainers() {
  const [data, setData] = useState<StockSummary[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await stockService.getTopGainers();
        setData(result);
      } catch (e: any) {
        setError(e.message ?? 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
