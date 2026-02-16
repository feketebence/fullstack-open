import { useSelector } from 'react-redux'
import { Alert, Snackbar } from '@mui/material'

const Notification = () => {
    const notifications = useSelector((state) => state.notifications)
    const lastNotification = notifications[notifications.length - 1]

    if (notifications.length === 0) {
        return null
    }

    return (
        <>
            <Snackbar
                open={lastNotification ? true : false}
                autoHideDuration={5000}
            >
                <Alert
                    severity={
                        lastNotification.type === 'success'
                            ? 'success'
                            : 'error'
                    }
                    variant="outlined"
                    sx={{ width: '100%' }}
                >
                    {lastNotification.content}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Notification
