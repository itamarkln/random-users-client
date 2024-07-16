import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { IUser } from '../../BL/User/interfaces/user.interface';

interface IUserCardProps {
    user: IUser;
}

const UserCard = ({ user }: IUserCardProps) => (
    <Card>
        <CardMedia
            component="img"
            alt="Profile Image"
            height="140"
            image={user.picture.thumbnail}
            title="Profile Image"
        />
        <CardContent>
            <Typography variant="h5" component="div">
                {`${user.title} ${user.first} ${user.last}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {`Gender: ${user.gender}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {`Age: ${user.age}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {`Country: ${user.country}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {`Email: ${user.email}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {`Phone: ${user.phone}`}
            </Typography>
        </CardContent>
    </Card>
);

export default UserCard;
