// src/app/_utilities/api.ts

import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

// Create a type-safe API client
const createApiClient = (): AxiosInstance => {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not defined. Please set it in your environment variables.');
  }
  
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor for auth token
  api.interceptors.request.use(
    (config) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor for error handling
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        // Handle specific status codes
        if (error.response.status === 403) {
          console.error('Access denied:', error.response.data?.message || 'You do not have permission to access this resource');
          // Optionally redirect to dashboard or show a message
          if (typeof window !== 'undefined' && window.location.pathname !== '/dashboards/crypto') {
            // window.location.href = '/dashboards/crypto';
          }
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Request setup error:', error.message);
      }
      return Promise.reject(error);
    }
  );

  return api;
};

const api = createApiClient();

export default api;