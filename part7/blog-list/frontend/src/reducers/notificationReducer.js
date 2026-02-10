import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const generateId = () => Math.floor(Math.random() * 1_000_000)

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addNotification(state, action) {
            const content = action.payload.notificationText
            const type = action.payload.notificationType
            const id = generateId()

            state.push({
                id,
                content,
                type
            })
        },
        removeNotification(state) {
            state.shift()
        }
        // NOTE: we can use mutative array methods (like `.push(...)` and `.shift()`)
    }
})

export const setNotification = (
    notificationText,
    notificationType,
    durationSec = 5
) => {
    return async (dispatch) => {
        dispatch(addNotification({ notificationText, notificationType }))

        setTimeout(() => {
            dispatch(removeNotification())
        }, durationSec * 1000)
    }
}

export const { addNotification, removeNotification } =
    notificationsSlice.actions
export default notificationsSlice.reducer
