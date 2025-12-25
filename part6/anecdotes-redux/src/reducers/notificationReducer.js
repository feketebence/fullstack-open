import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification(state, action) {
            const content = action.payload
            const id = Math.floor(Math.random() * 1_000_000)
            state.push({
                id,
                content
            })
        },
        removeNotification(state) {
            state.shift()
        }
    }
})

export const setNotification = (notificationText, durationSec = 5) => {
    return async (dispatch) => {
        dispatch(addNotification(notificationText))

        setTimeout(() => {
            dispatch(removeNotification())
        }, durationSec * 1000)
    }
}

export const { addNotification, removeNotification } =
    notificationsSlice.actions
export default notificationsSlice.reducer
