import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const BlogList = () => {
    const blogs = useSelector((state) => state.blogs)
    const navigate = useNavigate()

    if (blogs.length === 0) {
        return <>There are no blog entries.</>
    }

    return (
        <>
            <ul>
                {blogs
                    .slice()
                    .sort((a, b) => a.likes - b.likes)
                    .reverse()
                    .map((blog) => (
                        <li
                            key={blog.id}
                            onClick={() => navigate(`/blogs/${blog.id}`)}
                        >
                            {blog.title} - {blog.author}
                        </li>
                    ))}
            </ul>
        </>
    )
}

export default BlogList
