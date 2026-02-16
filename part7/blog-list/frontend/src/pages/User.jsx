import { Container, List, ListItem, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const User = () => {
    const { id } = useParams()
    const user = useSelector((state) =>
        state.users.find((user) => user.id === id)
    )
    const navigate = useNavigate()

    if (!user) {
        return null
    }

    return (
        <Container
            sx={{
                marginTop: 3,
                width: '100%',
                maxWidth: 1000,
                bgcolor: 'background.paper'
            }}
        >
            <Typography variant="h4">Blogs added by {user.name}:</Typography>
            <List>
                {user.blogs.map((blog) => (
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

export default User
