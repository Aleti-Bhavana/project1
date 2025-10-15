import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api/v1', // backend URL
});

// Auth APIs
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

// Task APIs (protected)
export const getTasks = (token) => API.get('/tasks', { headers: { Authorization: `Bearer ${token}` }});
export const createTask = (token, data) => API.post('/tasks', data, { headers: { Authorization: `Bearer ${token}` }});
export const updateTask = (token, id, data) => API.put(`/tasks/${id}`, data, { headers: { Authorization: `Bearer ${token}` }});
export const deleteTask = (token, id) => API.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` }});
