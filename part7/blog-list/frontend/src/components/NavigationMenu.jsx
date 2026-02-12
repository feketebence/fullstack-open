import { Link } from 'react-router-dom'

const NavigationMenu = () => {
    const style = {
        fontSize: 20,
        paddingRight: 10
    }

    return (
        <span>
            <span>blog app </span>

            <Link to="/" style={style}>
                blogs
            </Link>
            <Link to="/users" style={style}>
                users
            </Link>
        </span>
    )
}

export default NavigationMenu
