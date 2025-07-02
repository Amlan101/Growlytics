import { useEffect, useState } from 'react';
import stockService, { StockSummary } from 'services/stockService';

export default function useTopLosers() {
  const [data, setData] = useState<StockSummary[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await stockService.getTopLosers();
        setData(result);
        setError(null);
      } catch (e: any) {
        setError(e.message ?? 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
        fetchData();
    }, []);

  return { data, loading, error, reload: fetchData};
}