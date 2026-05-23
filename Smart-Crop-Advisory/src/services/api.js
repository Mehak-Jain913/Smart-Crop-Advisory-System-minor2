import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Auth
export const loginUser = (data) => api.post('/auth/login', data);
export const registerUser = (data) => api.post('/auth/register', data);
export const getMe = () => api.get('/auth/me');

// Weather
export const getWeather = (lat, lon) =>
  api.get('/weather', { params: { lat, lon } })
     .then((r) => r.data);

// Market
export const getMarketPrices = () =>
  api.get('/market').then((r) => r.data);

// Dashboard
export const getDashboardData = (lat, lon) =>
  api.post('/dashboard', { lat, lon })
     .then((r) => r.data);

// Recommendation
export const postRecommendation = (data) =>
  api.post('/recommend', data)
     .then((r) => r.data);

// Chatbot
export const sendChatMessage = (message, sessionId) =>
  api.post('/chatbot', { message, sessionId })
     .then((r) => r.data);

// Disease
export const detectDisease = (imageBase64, mimeType) =>
  api.post('/disease', { imageBase64, mimeType })
     .then((r) => r.data);

// Schemes
export const getSchemes = () =>
  api.get('/schemes').then((r) => r.data);

export default api;