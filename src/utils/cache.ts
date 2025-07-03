import AsyncStorage from '@react-native-async-storage/async-storage';

type CachedItem<T> = {
  data: T;
  timestamp: number;
};

export async function setCachedItem<T>(key: string, value: T): Promise<void> {
  const item: CachedItem<T> = {
    data: value,
    timestamp: Date.now(),
  };
  try {
    await AsyncStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.warn(`[Cache] Failed to set item for ${key}:`, error);
  }
}


export async function getCachedItem<T>(key: string, ttlInMs: number): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) {
      console.log(`[Cache MISS] ${key} (not found)`);
      return null;
    }
    
    const item: CachedItem<T> = JSON.parse(raw);
    const now = Date.now();

    if (now - item.timestamp > ttlInMs) {
      console.log(`[Cache MISS] ${key} (expired)`);
      return null;
    }

    console.log(`[Cache HIT] ${key}`);
    return item.data;
  } catch (error) {
    console.warn(`[Cache] Failed to get item for ${key}:`, error);
    return null;
  }
}