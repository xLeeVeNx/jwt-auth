import {IUser} from '../models/IUser';
import {AxiosResponse} from 'axios';
import {api} from '../http';

export class UserService {
    static async fetchUsers(): Promise<IUser[]> {
        const {data} = await api.get<IUser[]>('/users');
        return data;
    }
}
