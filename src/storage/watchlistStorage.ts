import AsyncStorage from '@react-native-async-storage/async-storage';
import { StockSummary } from 'models/Stock';

const WATCHLIST_KEY = '@watchlist';

export async function getWatchlist(): Promise<StockSummary[]> {
  try {
    const json = await AsyncStorage.getItem(WATCHLIST_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Failed to load watchlist', e);
    return [];
  }
}

export async function saveWatchlist(list: StockSummary[]): Promise<void> {
  try {
    const json = JSON.stringify(list);
    await AsyncStorage.setItem(WATCHLIST_KEY, json);
  } catch (e) {
    console.error('Failed to save watchlist', e);
  }
}

export async function addToWatchlist(item: StockSummary): Promise<void> {
  const list = await getWatchlist();
  const exists = list.find((s) => s.symbol === item.symbol);
  if (!exists) {
    await saveWatchlist([...list, item]);
  }
}

export async function removeFromWatchlist(symbol: string): Promise<void> {
  const list = await getWatchlist();
  const updated = list.filter((s) => s.symbol !== symbol);
  await saveWatchlist(updated);
}

export async function clearWatchlist(): Promise<void> {
  try {
    await AsyncStorage.removeItem(WATCHLIST_KEY);
    console.log('Watchlist cleared');
  } catch (e) {
    console.error('Failed to clear watchlist', e);
  }
}
