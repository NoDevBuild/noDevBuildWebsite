import axios from 'axios';

// Get environment configuration
const isProd = import.meta.env.VITE_PROJECT_ENV === 'prod';

// Create axios instance with base URL
const api = axios.create({
  // baseURL: isProd ? import.meta.env.VITE_PROD_API_URL : import.meta.env.VITE_DEV_API_URL,
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error);
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }

    // Handle API errors
    const errorMessage = error.response?.data?.error || 'An unexpected error occurred';
    console.error('API error:', error.response);
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;