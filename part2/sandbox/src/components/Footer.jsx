const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic'
    };

    return (
        <div style={footerStyle}>
            <br />
            <p>
                Note app, made with ❤️ based on{' '}
                <a href="https://fullstackopen.com/en/">fullstackopen.com</a>
            </p>
        </div>
    );
};

export default Footer;
