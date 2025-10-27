import { api } from './axios';

export const fetchEntries = (cursor?: number, limit = 20) => api.get('/entries', { params: { cursor, limit } }).then(r => r.data);
export const createEntry = (formData: FormData) => api.post('/entries', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
export const updateEntry = (id: number, formData: FormData) => api.put(`/entries/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
export const deleteEntry = (id: number) => api.delete(`/entries/${id}`).then(r => r.data);
export const searchEntries = (q?: string, type?: string) => api.get('/entries/search', { params: { q, type } }).then(r => r.data);
export const getEntry = (id: number) => api.get(`/entries/${id}`).then(r => r.data);
