import { useSelector } from 'react-redux'

import Blog from './Blog'

const BlogList = ({ user }) => {
    const blogs = useSelector((state) => state.blogs)

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
                    <Blog key={blog.id} blog={blog} user={user} />
                ))}
        </>
    )
}

export default BlogList
