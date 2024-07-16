import React from 'react';
import { Button, Container, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../BL/User/store/user.service';

const useStyles = makeStyles((theme) => ({
    buttonGroup: {
        marginTop: theme.spacing(3),
        '& > *': {
            marginRight: theme.spacing(2),
        },
    }
}));

const HomePage = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const fetchRandomUsers = () => {
        userService.clearRandomUsers();
        navigate('/user-list');
    };

    const fetchHistory = () => {
        navigate('/history');
    };

    return (
        <Container>
            <h1>Home Page</h1>
            <div className={classes.buttonGroup}>
                <Button variant="contained" color="primary" onClick={fetchRandomUsers}>
                    Fetch
                </Button>
                <Button variant="contained" color="secondary" onClick={fetchHistory}>
                    History
                </Button>
            </div>
        </Container>
    );
};

export default HomePage;
