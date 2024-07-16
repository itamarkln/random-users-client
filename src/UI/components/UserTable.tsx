import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { IUser } from '../../BL/User/interfaces/user.interface';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    row: {
        cursor: 'pointer',
        '&:hover': {
            opacity: 0.8,
        },
    }
});

interface IUserTableProps {
    users: IUser[];
    onRowClick: (user: IUser) => void;
}

const UserTable = ({ users, onRowClick }: IUserTableProps) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Thumbnail</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user: IUser) => (
                        <TableRow className={classes.row} key={user.id} onClick={() => onRowClick(user)}>
                            <TableCell><img src={user.picture.thumbnail} alt="thumbnail" /></TableCell>
                            <TableCell>{`${user.title} ${user.first} ${user.last}`}</TableCell>
                            <TableCell>{user.gender}</TableCell>
                            <TableCell>{user.country}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserTable;
