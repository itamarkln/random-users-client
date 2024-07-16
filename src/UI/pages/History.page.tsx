import React, { useEffect, useState } from 'react';
import UserTable from '../components/UserTable';
import { userService } from '../../BL/User/store/user.service';
import { userQuery } from '../../BL/User/store/user.query';
import { IUser } from '../../BL/User/interfaces/user.interface';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        margin: '1rem',
    },
});

const HistoryPage = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [savedUsers, setSavedUsers] = useState<IUser[]>([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const subscription = userQuery.savedUsers$.subscribe(savedUsers => setSavedUsers(savedUsers));
        userService.getUsers().catch(setError);
        return () => subscription.unsubscribe();
    }, []);

    const handleRowClick = (user: IUser) => {
        navigate(`/profile/${user.id}`);
    };

    return (
        <div className={classes.container}>
            <h1>History</h1>
            {error && <p>{error}</p>}
            <UserTable users={savedUsers} onRowClick={handleRowClick} />
        </div>
    );
};

export default HistoryPage;
