import { useNavigate } from 'react-router-dom'
import Button from './primitives/Button'
import Input from './primitives/Input'

const Login = (props) => {
    const navigate = useNavigate()

    const onSubmit = (event) => {
        event.preventDefault()
        props.onLogin('bence')
        navigate('/')
    }

    return (
        <div>
            <h2>login</h2>
            <form onSubmit={onSubmit}>
                <div>
                    username: <Input type="text" />
                </div>
                <div>
                    password: <Input type="password" />
                </div>
                <Button type="submit">login</Button>
            </form>
        </div>
    )
}

export default Login
