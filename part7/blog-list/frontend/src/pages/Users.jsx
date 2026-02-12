import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Users = () => {
    const users = useSelector((state) => state.users)
    const navigate = useNavigate()

    return (
        <>
            <h1>Users</h1>

            <table>
                <thead>
                    <tr>
                        <th scope="col">User</th>
                        <th scope="row">Created blogs</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            onClick={() => navigate(`/users/${user.id}`)}
                        >
                            <td>
                                {user.username} - {user.name}
                            </td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Users
