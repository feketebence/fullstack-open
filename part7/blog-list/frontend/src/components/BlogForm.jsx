import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { appendBlog } from '../reducers/blogReducer'
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography
} from '@mui/material'

const BlogForm = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const dispatch = useDispatch()

    const handleAddBlog = async (event) => {
        event.preventDefault()

        const newBlog = {
            title,
            author,
            url
        }

        dispatch(appendBlog(newBlog))

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <Card variant="outlined" sx={{ maxWidth: 600, marginTop: 3 }}>
            <CardContent>
                <Typography variant="h6">New blog</Typography>

                <Box
                    component="form"
                    onSubmit={handleAddBlog}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    <TextField
                        label="Title"
                        name="title"
                        fullWidth
                        placeholder="Here goes the title"
                        required
                        variant="outlined"
                        value={title}
                        onChange={(event) => {
                            setTitle(event.target.value)
                        }}
                    />
                    <TextField
                        label="Author"
                        name="author"
                        placeholder="Here goes the author"
                        required
                        variant="outlined"
                        value={author}
                        onChange={(event) => {
                            setAuthor(event.target.value)
                        }}
                    />
                    <TextField
                        label="URL"
                        name="url"
                        placeholder="https://here-goes-the-url.com/"
                        required
                        variant="outlined"
                        value={url}
                        onChange={(event) => {
                            setUrl(event.target.value)
                        }}
                    />
                    <Button type="submit" variant="contained">
                        add new blog
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default BlogForm
