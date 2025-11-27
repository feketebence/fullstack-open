import { useState } from 'react'

const Blog = ({ blog, user, onLikeClick, onRemoveClick }) => {
    const [expanded, setExpanded] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={blogStyle}>
            {blog.title} - {blog.author}{' '}
            <button onClick={() => setExpanded(!expanded)}>
                {expanded ? 'hide' : 'expand'}
            </button>
            {expanded && (
                <>
                    <br />
                    <p>{blog.url}</p>
                    <p>
                        likes {blog.likes}{' '}
                        <button onClick={onLikeClick}>like</button>
                    </p>
                    <p>Added by: {blog.user.name}</p>
                    {user.username === blog.user.username && (
                        <button onClick={onRemoveClick}>remove</button>
                    )}
                </>
            )}
        </div>
    )
}

export default Blog
