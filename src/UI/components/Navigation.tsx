import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    User Management
                </Typography>
                <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
                <Button color="inherit" onClick={() => navigate('/history')}>History</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;
