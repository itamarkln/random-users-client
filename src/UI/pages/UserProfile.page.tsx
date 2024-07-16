import { CircularProgress, Paper, Snackbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IUser } from '../../BL/User/interfaces/user.interface';
import { userQuery } from '../../BL/User/store/user.query';
import { userService } from '../../BL/User/store/user.service';
import UserForm from '../components/UserForm';
import { Alert } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(4),
        position: 'relative',
        maxWidth: '600px',
        margin: '0 auto',
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[5],
    },
    containerHeader: {
        margin: '0 auto',
        display: 'block',
        textAlign: 'center'
    },
    largeImage: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        margin: '1rem auto'
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alert: {
        marginBottom: theme.spacing(2),
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    title: {
        marginBottom: theme.spacing(2),
    },
}));

const UserProfilePage = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { id: userId } = useParams();

    const [user, setUser] = useState<IUser | null>(null);

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{ severity: 'success' | 'error'; message: string } | null>(null);

    useEffect(() => {
        let foundUser = userQuery.getValue().randomUsers.find((user: IUser) => user.id === userId) ||
            userQuery.getValue().savedUsers.find((user: IUser) => user.id === userId);

        if (foundUser) {
            setUser(foundUser);
        } else {
            navigate('/history');
        }
    }, [userId, navigate]);

    const handleSave = async () => {
        if (user) {
            setLoading(true);
            try {
                await userService.createUser(user);
                setAlert({ severity: 'success', message: 'User saved successfully' });
            } catch (err) {
                setAlert({ severity: 'error', message: 'Failed to save user' });
            } finally {
                setLoading(false);
            }
        }
    };

    const handleUpdate = async () => {
        if (user) {
            setLoading(true);
            try {
                await userService.updateUser(user.id, user);
                setAlert({ severity: 'success', message: 'User updated successfully' });
            } catch (err) {
                setAlert({ severity: 'error', message: 'Failed to update user' });
            } finally {
                setLoading(false);
            }
        }
    };

    const handleDelete = async () => {
        if (user) {
            setLoading(true);
            try {
                await userService.deleteUser(user.id);
                setAlert({ severity: 'success', message: 'User deleted successfully!' });
                navigate('/history');
            } catch (err) {
                setAlert({ severity: 'error', message: 'Failed to delete user.' });
            } finally {
                setLoading(false);
            }
        }
    };

    const handleCloseAlert = () => {
        setAlert(null);
    };

    if (loading) {
        return (
            <div className={classes.loadingOverlay}>
                <CircularProgress />
            </div>
        );
    }

    if (!user) {
        return <div>User not found</div>
    }

    return (
        <>
            <Paper className={classes.container}>
                <div className={classes.containerHeader}>
                    <Typography variant="h4">User Profile</Typography>
                    <img src={user?.picture.large} alt="profile" className={classes.largeImage} />
                </div>
                <UserForm user={user} onSave={handleSave} onDelete={handleDelete} onUpdate={handleUpdate} />
            </Paper>
            {alert && (
                <Snackbar open={true} autoHideDuration={2000} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert onClose={handleCloseAlert} severity={alert.severity}>
                        {alert.message}
                    </Alert>
                </Snackbar>
            )}
        </>
    );
};

export default UserProfilePage;
