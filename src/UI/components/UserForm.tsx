import { Button, makeStyles, TextField } from '@material-ui/core';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../BL/User/interfaces/user.interface';
import { userQuery } from '../../BL/User/store/user.query';

interface IUserFormProps {
    user: IUser;
    onSave: () => void;
    onDelete: () => void;
    onUpdate: () => void;
}

const useStyles = makeStyles((theme) => ({
    buttonGroup: {
        marginTop: theme.spacing(3),
        '& > *': {
            marginRight: theme.spacing(2),
        },
    }
}));

const UserForm = ({ user, onSave, onDelete, onUpdate }: IUserFormProps) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [isSavedUser, setIsSavedUser] = useState(false);

    useEffect(() => {
        let foundUser = userQuery.getValue().savedUsers.find((u: IUser) => u.id === user.id);
        setIsSavedUser(!!foundUser);
    }, [user]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        (user as any)[name] = value;
    };

    return (
        <div>
            <TextField
                label="Title"
                name="title"
                defaultValue={user.title}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="First Name"
                name="first"
                defaultValue={user.first}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Last Name"
                name="last"
                defaultValue={user.last}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <div className={classes.buttonGroup}>
                {!isSavedUser && <Button variant="contained" color="primary" onClick={onSave}>Save</Button>}
                {isSavedUser && <Button variant="contained" color="secondary" onClick={onDelete}>Delete</Button>}
                {isSavedUser && <Button variant="contained" onClick={onUpdate}>Update</Button>}
                {<Button variant="contained" onClick={() => navigate(-1)}>Back</Button>}
            </div>
        </div>
    );
};

export default UserForm;
