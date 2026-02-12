import { useSelector } from 'react-redux'

import Blog from './Blog'

const BlogList = () => {
    const blogs = useSelector((state) => state.blogs)
    const currentUser = useSelector((state) => state.currentUser)

    if (blogs.length === 0) {
        return <>There are no blog entries.</>
    }

    return (
        <>
            {blogs
                .slice()
                .sort((a, b) => a.likes - b.likes)
                .reverse()
                .map((blog) => (
                    <Blog key={blog.id} blog={blog} user={currentUser} />
                ))}
        </>
    )
}

export default BlogList
