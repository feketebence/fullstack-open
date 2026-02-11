import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import blogService from '../services/blogs'
import localStorage from '../services/localStorage'

import { setNotification } from './notificationReducer'

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: null,
    reducers: {
        setCurrentUser(_state, action) {
            return action.payload
        },
        unsetCurrentUser() {
            return null
        }
    }
})

export const { setCurrentUser, unsetCurrentUser } = currentUserSlice.actions

export const login = (credentials) => {
    return async (dispatch) => {
        try {
            const user = await loginService.login(credentials)
            localStorage.storeCurrentUser(user)
            blogService.setToken(user.token)

            dispatch(setCurrentUser(user))
        } catch {
            dispatch(
                setNotification(
                    'Error during log in. Credentials might be wrong.',
                    'error'
                )
            )
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        dispatch(unsetCurrentUser())
    }
}

export default currentUserSlice.reducer
