import { useContext } from 'react'

import NotificationsContext from '../NotificationContext'

const Notification = () => {
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5
    }

    const { notifications } = useContext(NotificationsContext)

    if (notifications.length === 0) return null

    return (
        <>
            {notifications.map((notification) => (
                <div key={notification.id} style={style}>
                    {notification.content}
                </div>
            ))}
        </>
    )
}

export default Notification
