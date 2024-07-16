import { Store, StoreConfig } from '@datorama/akita';
import { IUser } from '../interfaces/user.interface';

export interface UserState {
    randomUsers: IUser[];
    savedUsers: IUser[];
}

export function createInitialState(): UserState {
    return {
        randomUsers: [],
        savedUsers: []
    };
}

@StoreConfig({ name: 'user' })
export class UserStore extends Store<UserState> {
    constructor() {
        super(createInitialState());
    }
}

export const userStore = new UserStore();
