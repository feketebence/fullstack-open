import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { login } from '../reducers/currentUserReducer'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        console.log('handling login')

        event.preventDefault()
        dispatch(login({ username, password }))
    }

    return (
        <div className="container">
            <h2>Login</h2>

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
