import axios from 'axios';
import config from 'constants/config';

const apiClient = axios.create({
  baseURL: config.BASE_URL,
  timeout: 10000,
  params: {
    apikey: config.API_KEY,
  },
});

// Intercept responses to inject error handling (optional later)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
