import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000'
});

export const getRegistry = () => api.get('/registry').then(res => res.data);
export const getItem = (id) => api.get(`/registry/${id}`).then(res => res.data);
export const createItem = (data) => api.post('/registry', data);
export const updateItem = (id, data) => api.put(`/registry/${id}`, data);
export const deleteItem = (id) => api.delete(`/registry/${id}`);

export default api ;