import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { increaseBlogLikes, removeBlog } from '../reducers/blogReducer'
import Comments from '../components/Comments'
import CommentForm from '../components/CommentForm'

const Blog = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()

    const blog = useSelector((state) =>
        state.blogs.find((blog) => blog.id === id)
    )
    const currentUser = useSelector((state) => state.currentUser)

    const handleLikeClick = () => {
        dispatch(increaseBlogLikes(blog))
    }

    const handleRemoveClick = () => {
        dispatch(removeBlog(blog))
        navigate('/')
    }

    if (!blog) {
        return (
            <>
                <h3>Blog with id {id} not found</h3>
                <Link to="/">Go back to the landing page</Link>
            </>
        )
    }

    return (
        <div className="blog" id={blog.id}>
            {blog.title} - {blog.author}{' '}
            <>
                <br />
                <a href={blog.url} target="_blank">
                    {blog.url}
                </a>
                <p>
                    likes {blog.likes}{' '}
                    <button onClick={handleLikeClick}>like</button>
                </p>
                <p>Added by: {blog.user.name}</p>
                {currentUser.username === blog.user.username && (
                    <button onClick={handleRemoveClick}>remove</button>
                )}
                <Comments comments={blog.comments} />
                <CommentForm blog={blog} />
            </>
        </div>
    )
}

export default Blog
