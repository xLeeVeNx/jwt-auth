import {makeAutoObservable} from 'mobx';
import {IUser} from '../models/IUser';
import {AuthService} from '../services/AuthService';

export class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setIsLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            console.log('response', response);
            this.setAuth(true);
            this.setUser(response.user);
            localStorage.setItem('token', response.accessToken);
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            this.setAuth(true);
            this.setUser(response.user);
            localStorage.setItem('token', response.accessToken);
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            this.setAuth(false);
            this.setUser({} as IUser);
            localStorage.removeItem('token');
        } catch (e) {
            console.log(e);
        }
    }

    async checkAuth() {
        this.isLoading = true;
        try {
            const response = await AuthService.checkAuth();
            console.log('response', response);
            localStorage.setItem('token', response.accessToken);
            this.setAuth(true);
            this.setUser(response.user);
        } catch (e) {
            console.log(e);
        } finally {
            this.isLoading = false;
        }
    }
}
