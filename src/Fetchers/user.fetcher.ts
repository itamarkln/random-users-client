import axios from 'axios';
import { CreateUserDto } from '../BL/User/dtos/create-user.dto';
import { UpdateUserDto } from '../BL/User/dtos/update-user.dto';
import { SavedUserRo } from '../BL/User/ros/saved-user.ro';
import { RandomUserRo } from '../BL/User/ros/random-user.ro';

class UserFecther {
    private _API_URL = 'http://localhost:3001/users';
    private _RANDOM_USER_API_URL = 'https://randomuser.me/api/?results=10';

    public getRandomUsers(): Promise<RandomUserRo[]> {
        return axios.get(this._RANDOM_USER_API_URL).then(res => res.data.results);
    }

    public getUsers(): Promise<SavedUserRo[]> {
        return axios.get(this._API_URL).then(res => res.data);
    }

    public getUserById(id: string): Promise<SavedUserRo> {
        return axios.get(`${this._API_URL}/${id}`).then(res => res.data);
    }

    public createUser(createDto: CreateUserDto): Promise<SavedUserRo> {
        return axios.post(this._API_URL, createDto).then(res => res.data);
    };

    public updateUser(id: string, updateDto: UpdateUserDto): Promise<SavedUserRo> {
        return axios.put(`${this._API_URL}/${id}`, updateDto).then(res => res.data);
    }

    public deleteUser(id: string): Promise<void> {
        return axios.delete(`${this._API_URL}/${id}`).then(res => res.data);
    };
}

export const userFecther = new UserFecther();

