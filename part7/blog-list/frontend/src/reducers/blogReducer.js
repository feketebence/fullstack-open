import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        createBlog(state, action) {
            state.push(action.payload)
        },
        likeBlog(state, action) {
            const changedBlog = action.payload

            return state.map((blog) =>
                blog.id === changedBlog.id ? changedBlog : blog
            )
        },
        setBlogs(_state, action) {
            return action.payload
        }
    }
})

const { createBlog, likeBlog, setBlogs } = blogSlice.actions

export const appendBlog = (content) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(content)
        dispatch(createBlog(newBlog))
    }
}

export const increaseBlogLikes = (blog) => {
    return async (dispatch) => {
        try {
            const updatedBlog = await blogService.increaseLikes(blog.id)
            dispatch(likeBlog(updatedBlog))
        } catch {
            dispatch(
                setNotification(
                    `Blog "${blog.title} - ${blog.author}" was already removed from the server`,
                    'error'
                )
            )
            const actualBlogs = await blogService.getAll()
            dispatch(setBlogs(actualBlogs))
        }
    }
}

export const initializeBlogs = () => {
    return async (dispatch) => {
        const initialBlogs = await blogService.getAll()
        dispatch(setBlogs(initialBlogs))
    }
}

export default blogSlice.reducer
