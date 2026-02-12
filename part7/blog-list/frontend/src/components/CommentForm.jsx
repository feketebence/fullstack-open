import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { appendComment } from '../reducers/blogReducer'

const CommentForm = ({ blog }) => {
    const [comment, setContent] = useState('')
    const dispatch = useDispatch()

    const handleAddComment = (event) => {
        event.preventDefault()
        dispatch(appendComment(blog.id, comment))

        setContent('')
    }

    return (
        <>
            <form onSubmit={handleAddComment}>
                <input
                    type="text"
                    name="comment"
                    value={comment}
                    onChange={(event) => {
                        setContent(event.target.value)
                    }}
                />
                <button type="submit">add comment</button>
            </form>
        </>
    )
}

export default CommentForm
