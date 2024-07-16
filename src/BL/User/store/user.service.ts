import axios from 'axios';
import { userFecther } from '../../../Fetchers/user.fetcher';
import { userStore } from './user.store';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { RandomUserRo } from '../ros/random-user.ro';
import { convertRandomUserToIUser, convertSavedUserToIUser, convertToCreateUserDto, convertToUpdateUserDto } from '../utils/user-utils';
import { SavedUserRo } from '../ros/saved-user.ro';
import { IUser } from '../interfaces/user.interface';

export class UserService {
    async getRandomUsers() {
        const users = await userFecther.getRandomUsers();
        userStore.update(state => ({
            ...state,
            randomUsers: users.map(convertRandomUserToIUser),
            error: null,
        }));
    }

    async getUsers() {
        const users = await userFecther.getUsers();
        userStore.update(state => ({
            ...state,
            savedUsers: users.map(convertSavedUserToIUser),
            error: null,
        }));
    }

    async createUser(user: IUser) {
        const userDto: CreateUserDto = convertToCreateUserDto(user);
        const createdUser = await userFecther.createUser(userDto);
        userStore.update(state => ({
            ...state,
            savedUsers: [...state.savedUsers, convertSavedUserToIUser(createdUser)],
            error: null,
        }));
    }

    async getUserById(userId: string) {
        const foundUser = await userFecther.getUserById(userId);
        userStore.update(state => {
            const userIndex = state.savedUsers.findIndex((savedUser: SavedUserRo) => savedUser.id === foundUser.id);
            if (userIndex > 0) {
                state.savedUsers.splice(userIndex, 1, foundUser);
            } else {
                state.savedUsers.push(foundUser);
            }
            return {
                ...state,
                error: null,
            };
        });
    }

    async updateUser(userId: string, user: IUser) {
        const userDto: UpdateUserDto = convertToUpdateUserDto(user);
        const updatedUser = await userFecther.updateUser(userId, userDto);

        userStore.update(state => {
            const userIndex = state.savedUsers.findIndex((savedUser: SavedUserRo) => savedUser.id === updatedUser.id);
            state.savedUsers.splice(userIndex, 1, updatedUser);
            return {
                ...state,
                error: null,
            };
        });
    }

    async deleteUser(id: string) {
        await userFecther.deleteUser(id);
        userStore.update(state => ({
            ...state,
            savedUsers: state.savedUsers.filter(user => user.id !== id),
            error: null,
        }));
    }

    clearRandomUsers() {
        userStore.update(state => ({
            ...state,
            randomUsers: []
        }));
    }
}

export const userService = new UserService();
