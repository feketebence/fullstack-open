import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        createBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(_state, action) {
            return action.payload
        }
    }
})

const { createBlog, setBlogs } = blogSlice.actions

export const appendBlog = (content) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(content)
        dispatch(createBlog(newBlog))
    }
}

export const initializeBlogs = () => {
    return async (dispatch) => {
        const initialBlogs = await blogService.getAll()
        dispatch(setBlogs(initialBlogs))
    }
}

export default blogSlice.reducer
