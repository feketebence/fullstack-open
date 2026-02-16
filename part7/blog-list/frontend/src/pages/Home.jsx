import { useRef } from 'react'

import BlogForm from '../components/BlogForm'
import BlogList from '../components/BlogList'
import Togglable from '../components/Togglable'
import { Container } from '@mui/material'

const Home = () => {
    const blogFormRef = useRef()

    return (
        <>
            <BlogList />

            <Togglable
                revealButtonLabel="show blog creation form"
                hideButtonLabel="close blog creation form"
                ref={blogFormRef}
            >
                <BlogForm />
            </Togglable>
        </>
    )
}

export default Home
