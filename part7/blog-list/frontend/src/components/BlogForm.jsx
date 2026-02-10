import { useState } from 'react'

const BlogForm = ({ addBlogFn }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()

        addBlogFn({
            title,
            author,
            url
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h3>Add new blog</h3>
            <form onSubmit={addBlog}>
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
