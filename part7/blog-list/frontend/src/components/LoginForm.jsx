import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { login } from '../reducers/currentUserReducer'
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography
} from '@mui/material'
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
        <Card variant="outlined" sx={{ maxWidth: 600, marginTop: 3 }}>
            <CardContent>
                <Notification />
                <Typography variant="h6">Login</Typography>

                <Box
                    component="form"
                    onSubmit={handleLogin}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    <TextField
                        label="username"
                        name="username"
                        placeholder="here goes your username"
                        required
                        variant="outlined"
                        value={username}
                        onChange={(event) => {
                            setUsername(event.target.value)
                        }}
                    />
                    <TextField
                        label="password"
                        name="password"
                        type="password"
                        placeholder="here goes your password"
                        required
                        variant="outlined"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                    />
                    <Button type="submit" variant="contained">
                        login
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default LoginForm
