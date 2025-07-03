import { useEffect, useState, useCallback } from 'react';
import {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  clearWatchlist,
} from 'storage/watchlistStorage';
import { StockSummary } from 'models/Stock';

export default function useWatchlist() {
  const [watchlist, setWatchlist] = useState<StockSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWatchlist = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getWatchlist();
      setWatchlist(data);
      setError(null);
    } catch (e: any) {
      console.error('Error loading watchlist:', e);
      setError('Failed to load watchlist');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWatchlist();
  }, [loadWatchlist]);

  const add = async (item: StockSummary) => {
    await addToWatchlist(item);
    await loadWatchlist();
  };

  const remove = async (symbol: string) => {
    await removeFromWatchlist(symbol);
    await loadWatchlist();
  };

  return {
    watchlist,
    loading,
    error,
    add,
    remove,
    refresh: loadWatchlist,
    clear: clearWatchlist,
  };
}
