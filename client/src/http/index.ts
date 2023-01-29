import axios from 'axios';
import {config} from 'dotenv';
import {AuthService} from '../services/AuthService';

export const API_URL = 'http://localhost:5000/api';

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
});

api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
        const response = await AuthService.checkAuth();
        localStorage.setItem('token', response.accessToken);
        return api.request(originalRequest);
        } catch (e) {
            console.log('User is not authorized');
        }
    }
    throw error;
});
