import { api } from './axios';
export const signup = (body: any) => api.post('/auth/signup', body).then(r => r.data);
export const login = (body: any) => api.post('/auth/login', body).then(r => r.data);
