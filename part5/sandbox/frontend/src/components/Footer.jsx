const Footer = () => {
    const footerStyle = {
        textAlign: 'center',
        color: 'grey',
        fontStyle: 'italic',
        fontFamily: 'Courier New'
    }

    return (
        <div style={footerStyle}>
            <br />
            <p>
                Note app, made with ❤️ based on{' '}
                <a href="https://fullstackopen.com/en/">fullstackopen.com</a>
                <br />
                {new Date().getFullYear()}
            </p>
        </div>
    )
}

export default Footer
