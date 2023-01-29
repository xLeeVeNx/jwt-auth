import {api, API_URL} from '../http';
import {AuthResponse} from '../models/response/AuthResponse';
import axios from 'axios';

export class AuthService {
    static async login(email: string, password: string): Promise<AuthResponse> {
        const {data} = await api.post<AuthResponse>('/login', {email, password});
        return data;
    }

    static async registration(email: string, password: string): Promise<AuthResponse> {
        const {data} = await api.post<AuthResponse>('/registration', {email, password});
        return data;
    }

    static async logout(): Promise<void> {
        await api.post('/logout');
    }

    static async checkAuth(): Promise<AuthResponse> {
        const {data} = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
        return data;
    }
}
