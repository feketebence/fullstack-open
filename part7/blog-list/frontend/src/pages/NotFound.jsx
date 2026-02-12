import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <>
            <h2>404 - Not found</h2>
            <p>The requested page does not exist.</p>

            <Link to="/">Go back to landing page</Link>
        </>
    )
}

export default NotFound
