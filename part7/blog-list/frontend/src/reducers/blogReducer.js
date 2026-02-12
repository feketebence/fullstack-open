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
        deleteBlog(state, action) {
            const deletedBlog = action.payload
            return state.filter((blog) => blog.id !== deletedBlog.id)
        },
        updateBlog(state, action) {
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

// NOTE: this reducer is really slow, because the state structure is array based.
//  Object based state structure is much faster. Also, re-renders should be avoided.
// For more info:
//  https://redux-toolkit.js.org/usage/usage-guide#managing-normalized-data
//  https://redux.js.org/style-guide/

const { createBlog, deleteBlog, updateBlog, setBlogs } = blogSlice.actions

export const appendBlog = (blog) => {
    return async (dispatch) => {
        try {
            const newBlog = await blogService.create(blog)
            dispatch(createBlog(newBlog))
            dispatch(
                setNotification(
                    `Blog "${blog.title} - ${blog.author}" created successfully!`,
                    'success'
                )
            )
        } catch {
            dispatch(
                setNotification(
                    `Error occurred during creation of blog "${blog.title} - ${blog.author}".`,
                    'error'
                )
            )
        }
    }
}

export const appendComment = (blogId, comment) => {
    return async (dispatch) => {
        try {
            const blogWithComment = await blogService.addComment(
                blogId,
                comment
            )
            dispatch(updateBlog(blogWithComment))
            dispatch(setNotification(`Added comment "${comment}"`, 'success'))
        } catch {
            dispatch(
                setNotification(
                    `Error occurred during adding comment "${comment}".`,
                    'error'
                )
            )
        }
    }
}

export const removeBlog = (blog) => {
    return async (dispatch) => {
        try {
            await blogService.deleteBlog(blog)
            dispatch(deleteBlog(blog))
            dispatch(
                setNotification(
                    `Blog "${blog.title} - ${blog.author}" deleted successfully!`,
                    'success'
                )
            )
        } catch {
            dispatch(
                setNotification(
                    `Error occurred during deletion of blog "${blog.title} - ${blog.author}".`,
                    'error'
                )
            )
        }
    }
}

export const increaseBlogLikes = (blog) => {
    return async (dispatch) => {
        try {
            const updatedBlog = await blogService.increaseLikes(blog.id)
            dispatch(updateBlog(updatedBlog))
            dispatch(
                setNotification(
                    `Blog "${blog.title} - ${blog.author}" liked!`,
                    'success'
                )
            )
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
        try {
            const initialBlogs = await blogService.getAll()
            dispatch(setBlogs(initialBlogs))
        } catch {
            dispatch(setNotification('Could not initialize blogs', 'error'))
        }
    }
}

export default blogSlice.reducer
