import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT_MS } from '@constants/app';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT_MS,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message ?? 'API_ERROR';
    return Promise.reject(new Error(message));
  },
);
