import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../BL/User/interfaces/user.interface';
import { userQuery } from '../../BL/User/store/user.query';
import { userService } from '../../BL/User/store/user.service';
import UserTable from '../components/UserTable';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        margin: '1rem',
    },
});

const UserListPage = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [users, setUsers] = useState<any>([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const usersSubscription = userQuery.randomUsers$.subscribe(setUsers);
        const currentUsers = userQuery.getValue().randomUsers;

        if (currentUsers.length === 0) {
            userService.getRandomUsers().catch(setError);
        } else {
            setUsers(currentUsers);
        }

        return () => {
            usersSubscription.unsubscribe();
        };
    }, []);

    const handleRowClick = (user: IUser) => {
        navigate(`/profile/${user.id}`);
    };

    return (
        <div className={classes.container}>
            <h1>User List</h1>
            {error && <p>{error}</p>}
            <UserTable users={users} onRowClick={handleRowClick} />
        </div>
    );
};

export default UserListPage;
