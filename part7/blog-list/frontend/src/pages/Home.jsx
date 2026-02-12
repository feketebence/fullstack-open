import { useRef } from 'react'

import BlogForm from '../components/BlogForm'
import BlogList from '../components/BlogList'
import Togglable from '../components/Togglable'

const Home = () => {
    const blogFormRef = useRef()

    return (
        <div>
            <Togglable
                revealButtonLabel="show blog creation form"
                hideButtonLabel="close blog creation form"
                ref={blogFormRef}
            >
                <BlogForm />
            </Togglable>
            <br />
            <BlogList />
        </div>
    )
}

export default Home
