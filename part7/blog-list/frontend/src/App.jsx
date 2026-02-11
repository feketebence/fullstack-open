import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import blogService from './services/blogs'
import localStorage from './services/localStorage'

import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'

import { initializeBlogs } from './reducers/blogReducer'
import { setCurrentUser, unsetCurrentUser } from './reducers/currentUserReducer'

const App = () => {
    const blogFormRef = useRef()
    const dispatch = useDispatch()

    const currentUser = useSelector((state) => state.currentUser)

    useEffect(() => {
        if (currentUser) {
            dispatch(initializeBlogs())
        }
    }, [currentUser, dispatch])

    useEffect(() => {
        console.log('effect running for checking current user in cookies')

        const currentUser = localStorage.loadCurrentUser()
        if (currentUser) {
            console.log('user is found in cookies')

            dispatch(setCurrentUser(currentUser))
            blogService.setToken(currentUser.token)
        }
    }, [dispatch])

    const handleLogout = (event) => {
        console.log('handling logout')

        event.preventDefault()

        localStorage.removeCurrentUser()
        blogService.setToken(null)
        dispatch(unsetCurrentUser())
    }

    if (currentUser === null) {
        return <LoginForm />
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
