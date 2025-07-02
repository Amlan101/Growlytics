import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig?.extra?.ALPHA_VANTAGE_API_KEY;

const BASE_URL = 'https://www.alphavantage.co/query';

export default {
  API_KEY,
  BASE_URL,
};
