import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { increaseBlogLikes, removeBlog } from '../reducers/blogReducer'
import Comments from '../components/Comments'
import CommentForm from '../components/CommentForm'
import {
    Button,
    Box,
    Card,
    CardActions,
    CardContent,
    Container,
    Typography
} from '@mui/material'

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
        <Container sx={{ marginTop: 4, maxWidth: 800 }}>
            <Card className="blog" id={blog.id}>
                <CardContent>
                    <Typography
                        gutterBottom
                        sx={{ color: 'text.primary', fontSize: 20 }}
                    >
                        {blog.title} - {blog.author}
                    </Typography>

                    <a href={blog.url} target="_blank">
                        <Typography>{blog.url}</Typography>
                    </a>
                    <br />
                    <br />

                    <Typography>Added by: {blog.user.name}</Typography>

                    <Box
                        sx={{
                            margin: 2,
                            padding: 1,
                            border: 2,
                            borderColor: '#b5e0ffff',
                            borderBlockStyle: 'solid',
                            borderRadius: 2
                        }}
                    >
                        <Comments comments={blog.comments} />
                        <CommentForm blog={blog} />
                    </Box>
                </CardContent>
                <CardActions>
                    <Typography>
                        likes {blog.likes}{' '}
                        <Button variant="outlined" onClick={handleLikeClick}>
                            like
                        </Button>
                    </Typography>
                    {currentUser.username === blog.user.username && (
                        <Button variant="contained" onClick={handleRemoveClick}>
                            remove
                        </Button>
                    )}
                </CardActions>
            </Card>
        </Container>
    )
}

export default Blog
