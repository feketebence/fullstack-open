import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { setNotification } from './reducers/notificationReducer'

import blogService from './services/blogs'
import loginService from './services/login'

import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
    const blogFormRef = useRef()

    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

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

            dispatch(
                setNotification(
                    `${user.name} logged in successfully.`,
                    'success'
                )
            )
        } catch {
            dispatch(setNotification('wrong credentials', 'error'))
        }
    }

    const handleLogout = (event) => {
        event.preventDefault()

        window.localStorage.removeItem('loggedBlogListAppUser')
        blogService.setToken(null)
        setUser(null)
    }

    // const handleLikeClick = async (id) => {
    //     const blog = blogs.find((b) => b.id === id)

    //     const newBlog = {
    //         ...blog,
    //         likes: blog.likes + 1
    //     }

    //     try {
    //         const updatedBlog = await blogService.update(id, newBlog)

    //         // replace the old object with the updated one
    //         const nextBlogs = blogs.map((b) => (b.id === id ? updatedBlog : b))
    //         dispatch(
    //             setNotification(
    //                 `Blog "${blog.title} - ${blog.author}" liked`,
    //                 'success'
    //             )
    //         )
    //         setBlogs(nextBlogs)
    //     } catch {
    //         dispatch(
    //             setNotification(
    //                 `Blog "${blog.title} - ${blog.author}" was already removed from the server`,
    //                 'error'
    //             )
    //         )

    //         const nextBlogs = blogs.filter((n) => n.id !== id)
    //         setBlogs(nextBlogs)
    //     }
    // }

    // const handleRemoveClick = async (id) => {
    //     const selectedBlog = blogs.find((b) => b.id === id)

    //     const deleteConfirmed = window.confirm(
    //         `You are going to delete blog ${selectedBlog.title} by ${selectedBlog.author}`
    //     )
    //     if (!deleteConfirmed) {
    //         return
    //     }

    //     try {
    //         await blogService.deleteBlog(selectedBlog)
    //         const nextBlogs = blogs.filter((b) => b.id !== selectedBlog.id)
    //         setBlogs(nextBlogs)

    //         dispatch(
    //             setNotification(
    //                 `Successfully deleted blog "${selectedBlog.title} - ${selectedBlog.author}"`,
    //                 'success'
    //             )
    //         )
    //     } catch {
    //         dispatch(
    //             setNotification(
    //                 `Error occurred during deleting blog "${selectedBlog.title} - ${selectedBlog.author}"`,
    //                 'error'
    //             )
    //         )
    //     }
    // }

    if (user === null) {
        return (
            <div className="container">
                <h2>Login</h2>
                <Notification />

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
            <Notification />
            <br />
            <hr />
            <Togglable
                revealButtonLabel="show blog creation form"
                hideButtonLabel="close blog creation form"
                ref={blogFormRef}
            >
                <BlogForm />
            </Togglable>
            <br />
            <BlogList user={user} />
        </div>
    )
}

export default App
