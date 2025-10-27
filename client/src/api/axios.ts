import axios from 'axios';
import { getToken } from '../context/AuthContext';

export const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE });

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
