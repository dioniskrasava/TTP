import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const userAPI = {
    // Получить всех пользователей
    getUsers: async () => {
        const response = await api.get('/users');
        return response.data;
    },

    // Получить пользователя по ID
    getUser: async (id) => {
        const response = await api.get(`/users/${id}`);
        return response.data;
    },

    // Создать пользователя
    createUser: async (userData) => {
        const response = await api.post('/users', userData);
        return response.data;
    },

    // Обновить пользователя
    updateUser: async (id, userData) => {
        const response = await api.put(`/users/${id}`, userData);
        return response.data;
    },

    // Удалить пользователя
    deleteUser: async (id) => {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    },
};