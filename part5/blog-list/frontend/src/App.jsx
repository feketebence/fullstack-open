import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [message, setMessage] = useState(null)
    const [notificationType, setNotificationType] = useState(null)

    const blogFormRef = useRef()

    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])

    useEffect(() => {
        const loggedInUserJSON = window.localStorage.getItem(
            'loggedBlogListAppUser'
        )

        if (loggedInUserJSON) {
            const user = JSON.parse(loggedInUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })

            window.localStorage.setItem(
                'loggedBlogListAppUser',
                JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)

            setMessage('logged in successfully')
            setNotificationType('success')
            setTimeout(() => {
                setMessage(null)
            }, 3000)
        } catch {
            setMessage('wrong credentials')
            setNotificationType('error')
            setTimeout(() => {
                setMessage(null)
                setNotificationType(null)
            }, 5000)
        }
    }

    const handleLogout = (event) => {
        event.preventDefault()

        window.localStorage.removeItem('loggedBlogListAppUser')
        blogService.setToken(null)
        setUser(null)
    }

    const handleLikeClick = async (id) => {
        const blog = blogs.find((b) => b.id === id)

        const newBlog = {
            ...blog,
            likes: blog.likes + 1
        }

        try {
            const updatedBlog = await blogService.update(id, newBlog)

            // replace the old object with the updated one
            const nextBlogs = blogs.map((b) => (b.id === id ? updatedBlog : b))

            setBlogs(nextBlogs)
        } catch {
            setMessage(
                `Blog "${blog.title} - ${blog.author}" was already removed from the server`
            )
            setTimeout(() => {
                setMessage(null)
            }, 5000)

            const nextBlogs = blogs.filter((n) => n.id !== id)
            setBlogs(nextBlogs)
        }
    }

    const handleRemoveClick = async (id) => {
        const selectedBlog = blogs.find((b) => b.id === id)

        const deleteConfirmed = window.confirm(
            `You are going to delete blog ${selectedBlog.title} by ${selectedBlog.author}`
        )
        if (!deleteConfirmed) {
            return
        }

        try {
            await blogService.deleteBlog(selectedBlog)
            const nextBlogs = blogs.filter((b) => b.id !== selectedBlog.id)
            setBlogs(nextBlogs)

            setMessage(
                `Successfully deleted blog "${selectedBlog.title} - ${selectedBlog.author}"`
            )
            setNotificationType('success')

            setTimeout(() => {
                setMessage(null)
            }, 5000)
        } catch {
            setMessage(
                `Error occurred during deleting blog "${selectedBlog.title} - ${selectedBlog.author}"`
            )
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const addBlog = async (blogObject) => {
        try {
            blogFormRef.current.toggleVisibility()
            const createdBlog = await blogService.create(blogObject)

            // add the creator user's data to the newly created blog
            // NOTE: this should be done on the backend, but I don't
            // know how to populate a newly saved blog object
            const createdBlogWithUser = {
                ...createdBlog,
                user: {
                    name: user.name,
                    username: user.username
                }
            }

            setBlogs(blogs.concat(createdBlogWithUser))

            setMessage(
                `Added new blog: ${createdBlogWithUser.title} - ${createdBlogWithUser.author}`
            )
            setNotificationType('success')
            setTimeout(() => {
                setMessage(null)
                setNotificationType(null)
            }, 5000)
        } catch {
            setMessage('error during creation of new blog')
            setNotificationType('error')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    if (user === null) {
        return (
            <div className="container">
                <h2>Login</h2>
                <Notification message={message} type={notificationType} />

                <form onSubmit={handleLogin}>
                    <div>
                        <label>
                            username{' '}
                            <input
                                type="text"
                                value={username}
                                onChange={({ target }) =>
                                    setUsername(target.value)
                                }
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            password{' '}
                            <input
                                type="password"
                                value={password}
                                onChange={({ target }) =>
                                    setPassword(target.value)
                                }
                            />
                        </label>
                    </div>
                    <button type="submit">login</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            <p>{user.name} is logged in</p>
            <button onClick={handleLogout}>log out</button>

            <Notification message={message} type={notificationType} />

            <br />
            <hr />

            <Togglable
                revealButtonLabel="show blog creation form"
                hideButtonLabel="close blog creation form"
                ref={blogFormRef}
            >
                <BlogForm addBlogFn={addBlog} />
            </Togglable>

            <br />

            {blogs
                .sort((a, b) => a.likes - b.likes)
                .reverse()
                .map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        user={user}
                        onLikeClick={() => handleLikeClick(blog.id)}
                        onRemoveClick={() => handleRemoveClick(blog.id)}
                    />
                ))}
        </div>
    )
}

export default App
