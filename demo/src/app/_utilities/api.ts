// src/app/_utilities/api.ts

import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL
  // IMPORTANT: do NOT set global Content-Type header, let Axios set it based on request!
});

// Attach JWT token if present
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Handle global error responses (e.g., 401, 500)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Add your global error handling here, e.g.:
    // if (error.response?.status === 401) { /* redirect to login */ }
    return Promise.reject(error);
  }
);

export default api;