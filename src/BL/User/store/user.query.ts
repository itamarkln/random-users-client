import { Query } from '@datorama/akita';
import { UserState, UserStore, userStore } from './user.store';

export class UserQuery extends Query<UserState> {
    constructor(protected store: UserStore) {
        super(store);
    }

    get randomUsers$() {
        return this.select(state => state.randomUsers);
    }

    get savedUsers$() {
        return this.select(state => state.savedUsers);
    }
}

export const userQuery = new UserQuery(userStore);
