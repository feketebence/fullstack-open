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

    const addBlog = async (blogObject) => {
        try {
            blogFormRef.current.toggleVisibility()
            const createdBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(createdBlog))

            setMessage(
                `Added new blog: ${createdBlog.title} - ${createdBlog.author}`
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

            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

export default App
