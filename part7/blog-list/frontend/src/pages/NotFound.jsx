import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <>
            <Typography variant="h2">404 - Not found</Typography>
            <Typography variant="body1">
                The requested page does not exist.
            </Typography>

            <Link to="/">
                <Typography>Go back to landing page</Typography>
            </Link>
        </>
    )
}

export default NotFound
