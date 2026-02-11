import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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

export const increaseBlogLikes = (id) => {
    return async (dispatch) => {
        const updatedBlog = await blogService.increaseLikes(id)

        dispatch(likeBlog(updatedBlog))
    }
}

export const initializeBlogs = () => {
    return async (dispatch) => {
        const initialBlogs = await blogService.getAll()
        dispatch(setBlogs(initialBlogs))
    }
}

export default blogSlice.reducer
