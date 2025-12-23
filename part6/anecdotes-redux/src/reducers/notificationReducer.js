import { createSlice } from '@reduxjs/toolkit'

const initialState = 'this is the notification content'

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notificationChange(state, action) {
            const notificationValue = action.payload

            return notificationValue
        }
    }
})

export const { notificationChange } = notificationSlice.actions
export default notificationSlice.reducer
