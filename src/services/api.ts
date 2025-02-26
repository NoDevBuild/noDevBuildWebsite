import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:5000/api/',
  baseURL: 'https://server-nodevbuild-2.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
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