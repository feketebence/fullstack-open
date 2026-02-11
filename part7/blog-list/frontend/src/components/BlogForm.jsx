import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { appendBlog } from '../reducers/blogReducer'

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
        <div>
            <h3>Add new blog</h3>
            <form onSubmit={handleAddBlog}>
                <div>
                    <label>
                        title{' '}
                        <input
                            name="title"
                            type="text"
                            value={title}
                            onChange={(event) => {
                                setTitle(event.target.value)
                            }}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        author{' '}
                        <input
                            type="text"
                            value={author}
                            onChange={(event) => {
                                setAuthor(event.target.value)
                            }}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        url{' '}
                        <input
                            type="text"
                            value={url}
                            onChange={(event) => {
                                setUrl(event.target.value)
                            }}
                        />
                    </label>
                </div>
                <button type="submit">add new blog</button>
            </form>
            <hr />
        </div>
    )
}

export default BlogForm
