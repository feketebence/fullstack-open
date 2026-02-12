import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers(_state, action) {
            return action.payload
        }
    }
})

const { setUsers } = userSlice.actions

export const initializeUsers = () => {
    return async (dispatch) => {
        try {
            const initialUsers = await userService.getAll()
            dispatch(setUsers(initialUsers))
        } catch {
            dispatch(setNotification('Could not fetch users', 'error'))
        }
    }
}

export default userSlice.reducer
