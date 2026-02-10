import { useState } from 'react'

const Blog = ({ blog, user }) => {
    const [expanded, setExpanded] = useState(false)
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const handleLikeClick = () => {
        console.log(`todo: increase likes of blog with id ${blog.id}`)
    }

    const handleRemoveClick = () => {
        console.log(`todo: handle the deletion of blog with id ${blog.id}`)
    }

    return (
        <div className="blog" style={blogStyle} id={blog.id}>
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
                        <button onClick={handleLikeClick}>like</button>
                    </p>
                    <p>Added by: {blog.user.name}</p>
                    {user.username === blog.user.username && (
                        <button onClick={handleRemoveClick}>remove</button>
                    )}
                </>
            )}
        </div>
    )
}

export default Blog
