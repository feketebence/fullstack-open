const Notification = ({ message, type }) => {
    const icon = type === 'success' ? '✅' : '❌'
    if (message === null) {
        return null
    }

    return (
        <div>
            <p>
                {icon} {message} {icon}
            </p>
        </div>
    )
}

export default Notification
