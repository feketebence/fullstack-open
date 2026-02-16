import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { appendComment } from '../reducers/blogReducer'
import { Box, Button, TextField } from '@mui/material'

const CommentForm = ({ blog }) => {
    const [comment, setContent] = useState('')
    const dispatch = useDispatch()

    const handleAddComment = (event) => {
        event.preventDefault()
        dispatch(appendComment(blog.id, comment))

        setContent('')
    }

    return (
        <Box
            component="form"
            onSubmit={handleAddComment}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                width: 400
            }}
        >
            <TextField
                placeholder="Add new comment"
                required
                variant="outlined"
                value={comment}
                onChange={(event) => {
                    setContent(event.target.value)
                }}
            />

            <Button type="submit" variant="contained">
                add comment
            </Button>
        </Box>
    )
}

export default CommentForm
