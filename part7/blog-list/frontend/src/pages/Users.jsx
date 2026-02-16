import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Users = () => {
    const users = useSelector((state) => state.users)
    const navigate = useNavigate()

    return (
        <Container
            sx={{
                marginTop: 3,
                width: '100%',
                maxWidth: 1000,
                bgcolor: 'background.paper'
            }}
        >
            <Typography variant="h4">Users</Typography>
            <TableContainer
                component={Paper}
                sx={{ minWidth: 300, maxWidth: 600 }}
            >
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow
                            sx={{
                                backgroundColor: '#b5e0ffff',
                                '& th': {
                                    color: '#222222ff',
                                    fontWeight: 'bold'
                                }
                            }}
                        >
                            <TableCell>User</TableCell>
                            <TableCell>created blogs</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                hover
                                key={user.id}
                                sx={{
                                    cursor: 'pointer',
                                    '&:last-child td, &:last-child th': {
                                        border: 0
                                    }
                                }}
                                onClick={() => navigate(`/users/${user.id}`)}
                            >
                                <TableCell component="th" scope="row">
                                    {user.username} - {user.name}
                                </TableCell>
                                <TableCell>{user.blogs.length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default Users
