import {
    Box,
    Container,
    Divider,
    List,
    ListItem,
    Typography
} from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const BlogList = () => {
    const blogs = useSelector((state) => state.blogs)
    const navigate = useNavigate()

    if (blogs.length === 0) {
        return <Typography variant="h4">There are no blog entries.</Typography>
    }

    return (
        <Container
            sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}
        >
            <List>
                {blogs
                    .slice()
                    .sort((a, b) => a.likes - b.likes)
                    .reverse()
                    .map((blog) => (
                        <ListItem
                            key={blog.id}
                            sx={{
                                fontSize: 20,
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: '#8dcbffff'
                                }
                            }}
                            onClick={() => navigate(`/blogs/${blog.id}`)}
                        >
                            {blog.title} - {blog.author}
                        </ListItem>
                    ))}
            </List>
        </Container>
    )
}

export default BlogList
