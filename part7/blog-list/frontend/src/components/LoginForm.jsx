import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { login } from '../reducers/currentUserReducer'
import Notification from './Notification'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        dispatch(login({ username, password }))
    }

    return (
        <div className="container">
            <h2>Login</h2>
            <Notification />

            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        username user
                        <input
                            type="text"
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        password{' '}
                        <input
                            type="password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </label>
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm
