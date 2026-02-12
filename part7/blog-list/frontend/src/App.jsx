import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import blogService from './services/blogs'
import localStorage from './services/localStorage'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

import { initializeBlogs } from './reducers/blogReducer'
import { setCurrentUser, unsetCurrentUser } from './reducers/currentUserReducer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Users from './pages/Users'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
    const dispatch = useDispatch()

    const currentUser = useSelector((state) => state.currentUser)

    useEffect(() => {
        if (currentUser) {
            dispatch(initializeBlogs())
            dispatch(initializeUsers())
        }
    }, [currentUser, dispatch])

    useEffect(() => {
        const currentUser = localStorage.loadCurrentUser()

        if (currentUser) {
            dispatch(setCurrentUser(currentUser))
            blogService.setToken(currentUser.token)
        }
    }, [dispatch])

    const handleLogout = (event) => {
        event.preventDefault()

        localStorage.removeCurrentUser()
        blogService.setToken(null)
        dispatch(unsetCurrentUser())
    }

    if (currentUser === null) {
        return <LoginForm />
    }

    return (
        <>
            <div>
                <h2>blogs</h2>
                <Notification />

                <p>{currentUser.name} is logged in</p>
                <button onClick={handleLogout}>log out</button>
                <hr />
            </div>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </>
    )
}

export default App
