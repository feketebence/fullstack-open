import { useState } from 'react'

const Blog = ({ blog }) => {
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
                    {blog.url} <br />
                    likes {blog.likes} <button>like</button>
                    <br />
                    {blog.author} <br />
                </>
            )}
        </div>
    )
}

export default Blog
