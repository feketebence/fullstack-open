import { useSelector } from 'react-redux'

const Notification = () => {
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 10
    }

    const notifications = useSelector((state) => {
        return state.notifications
    })

    if (notifications.length === 0) {
        return null
    }

    return (
        <>
            {notifications.map((notification) => (
                <div style={style} key={notification.id}>
                    {notification.content}
                </div>
            ))}
        </>
    )
}

export default Notification
