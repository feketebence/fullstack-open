import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import blogService from './services/blogs'

import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import { initializeBlogs } from './reducers/blogReducer'
import {
    login,
    setCurrentUser,
    unsetCurrentUser
} from './reducers/currentUserReducer'

const App = () => {
    const blogFormRef = useRef()

    const currentUser = useSelector((state) => state.currentUser)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        if (currentUser) {
            dispatch(initializeBlogs())
        }
    }, [currentUser, dispatch])

    useEffect(() => {
        console.log('effect running for checking current user in cookies')

        const loggedInUserJSON = window.localStorage.getItem(
            'loggedInBlogListAppUser'
        )

        if (loggedInUserJSON) {
            console.log('user is found in cookies')

            const user = JSON.parse(loggedInUserJSON)
            dispatch(setCurrentUser(user))
            blogService.setToken(user.token)
        }
    }, [dispatch])

    const handleLogin = async (event) => {
        console.log('handling login')

        event.preventDefault()
        dispatch(login({ username, password }))
    }

    const handleLogout = (event) => {
        console.log('handling logout')

        event.preventDefault()

        window.localStorage.removeItem('loggedInBlogListAppUser')
        blogService.setToken(null)
        dispatch(unsetCurrentUser())
    }

    if (currentUser === null) {
        return (
            <div className="container">
                <h2>Login</h2>
                <Notification />

                <form onSubmit={handleLogin}>
                    <div>
                        <label>
                            username user
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
            <p>{currentUser.name} is logged in</p>
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
            <BlogList user={currentUser} />
        </div>
    )
}

export default App
