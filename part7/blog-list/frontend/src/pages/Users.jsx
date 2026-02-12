import { useSelector } from 'react-redux'

const Users = () => {
    const users = useSelector((state) => state.users)

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
                        <tr key={user.id}>
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
