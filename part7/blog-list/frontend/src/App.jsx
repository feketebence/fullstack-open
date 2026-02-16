import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import blogService from './services/blogs'
import localStorage from './services/localStorage'

import LoginForm from './components/LoginForm'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { setCurrentUser } from './reducers/currentUserReducer'

import Home from './pages/Home'
import Users from './pages/Users'
import User from './pages/User'
import NotFound from './pages/NotFound'
import Blog from './pages/Blog'
import NavigationMenu from './components/NavigationMenu'
import Notification from './components/Notification'
import { Container } from '@mui/material'

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

    if (currentUser === null) {
        return <LoginForm />
    }

    return (
        <>
            <div>
                <NavigationMenu currentUser={currentUser} />
            </div>
            <Notification />

            <Container sx={{ marginTop: 3 }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/:id" element={<User />} />
                    <Route path="/blogs/:id" element={<Blog />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </Container>
        </>
    )
}

export default App
