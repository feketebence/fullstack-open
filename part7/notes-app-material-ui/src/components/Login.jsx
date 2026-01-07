import { Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const navigate = useNavigate()

    const onSubmit = (event) => {
        event.preventDefault()
        props.onLogin('mluukkai')
        navigate('/')
    }

    return (
        <div>
            <h2>login</h2>

            <form onSubmit={onSubmit}>
                <div>
                    <TextField label="username" type="text" />
                </div>
                <div>
                    <TextField label="password" type="password" />
                </div>
                <div>
                    <Button type="submit" variant="contained" color="primary">
                        Login
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Login
